import { jwtVerify, SignJWT } from "jose";

export type SyncStudent = { id: string; name: string; points: number };
export type SyncLog = { id: string; studentId: string; at: string; item: string; delta: number; balance: number };

const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

function requireConfig() {
  const url = supabaseUrl();
  const key = serviceKey();
  if (!url || !key) throw new Error("Supabase server configuration is missing");
  return { url, key };
}

async function request(path: string, init?: RequestInit) {
  const { url, key } = requireConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${body.slice(0, 240)}`);
  }
  const body = await response.text();
  if (!body.trim()) return null;
  return JSON.parse(body);
}

export async function readSnapshot(): Promise<{ students: SyncStudent[]; logs: SyncLog[] }> {
  const [students, rawLogs] = await Promise.all([
    request("students?select=id,qr_id,name,points&order=created_at.asc"),
    request("point_logs?select=id,student_id,item,delta,balance,created_at&order=created_at.asc"),
  ]);
  const uuidByQr = new Map<string, string>();
  const rawStudents = students as Array<{ id?: string; qr_id: string; name: string; points: number }>;
  rawStudents.forEach(student => uuidByQr.set(student.qr_id, student.id || student.qr_id));
  return {
    students: rawStudents.map(student => ({ id: student.qr_id, name: student.name, points: student.points })),
    logs: (rawLogs as Array<{ id: string; student_id: string; item: string; delta: number; balance: number; created_at: string }>).map(log => ({
      id: log.id,
      studentId: uuidByQr.get(log.student_id) || log.student_id,
      at: log.created_at,
      item: log.item,
      delta: log.delta,
      balance: log.balance,
    })),
  };
}

export async function replaceSnapshot(snapshot: { students: SyncStudent[]; logs: SyncLog[] }) {
  const current = await readSnapshot();
  const currentIds = new Set(current.students.map(student => student.id));
  const nextIds = new Set(snapshot.students.map(student => student.id));
  const removedStudents = Array.from(currentIds).filter(id => !nextIds.has(id));
  if (removedStudents.length) {
    const encoded = removedStudents.map(id => `\"${id.replace(/\"/g, "") }\"`).join(",");
    await request(`students?qr_id=in.(${encoded})`, { method: "DELETE" });
  }

  const rows = snapshot.students.map(student => ({ qr_id: student.id, name: student.name, points: student.points }));
  if (rows.length) {
    await request("students?on_conflict=qr_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify(rows),
    });
  }

  const studentRows = await request("students?select=id,qr_id") as Array<{ id: string; qr_id: string }>;
  const uuidByQr = new Map(studentRows.map(row => [row.qr_id, row.id]));
  const currentLogIds = new Set(current.logs.map(log => log.id));
  const nextLogIds = new Set(snapshot.logs.map(log => log.id));
  const removedLogs = Array.from(currentLogIds).filter(id => !nextLogIds.has(id));
  if (removedLogs.length) {
    const encoded = removedLogs.map(id => `\"${id.replace(/\"/g, "") }\"`).join(",");
    await request(`point_logs?id=in.(${encoded})`, { method: "DELETE" });
  }
  const logs = snapshot.logs.map(log => ({
    id: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(log.id) ? log.id : crypto.randomUUID(),
    student_id: uuidByQr.get(log.studentId),
    item: log.item,
    delta: log.delta,
    balance: log.balance,
    created_at: log.at,
    updated_at: log.at,
  })).filter(log => log.student_id);
  if (logs.length) {
    await request("point_logs?on_conflict=id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify(logs),
    });
  }
  return readSnapshot();
}

const encoder = new TextEncoder();
const authSecret = () => encoder.encode(process.env.JWT_SECRET || "morning-joy-development-secret");

export async function createSyncToken(account: string) {
  return new SignJWT({ scope: "points:sync", account })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(authSecret());
}

export async function verifySyncToken(token: string) {
  const { payload } = await jwtVerify(token, authSecret());
  if (payload.scope !== "points:sync") throw new Error("Invalid sync scope");
  return payload;
}
