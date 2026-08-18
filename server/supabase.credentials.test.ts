import { describe, expect, it } from "vitest";
import { createSyncToken, fromSupabaseStudentRow, isSyncStudentId, readSnapshot, replaceSnapshot, toSupabaseStudentRow, verifySyncToken } from "./supabase";

describe("Supabase server credentials", () => {
  it("can read the students table without exposing the key", async () => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(url).toBeTruthy();
    expect(key).toBeTruthy();

    const response = await fetch(`${url}/rest/v1/students?select=id,qr_id,nfc_id&limit=1`, {
      headers: {
        apikey: key!,
        Authorization: `Bearer ${key!}`,
      },
    });

    expect(response.ok).toBe(true);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  }, 15_000);

  it("can round-trip the current snapshot through the write path", async () => {
    const snapshot = await readSnapshot();
    const saved = await replaceSnapshot(snapshot);
    expect(saved.students).toEqual(snapshot.students);
    expect(saved.logs).toEqual(snapshot.logs);
    expect(saved.students.every(student => isSyncStudentId(student.id) && student.qrCode.trim().length > 0)).toBe(true);
    expect(saved.students.every(student => student.nfcCode === undefined || student.nfcCode.trim().length > 0)).toBe(true);
  }, 20_000);

  it("maps separate QR and NFC Code values without data loss", () => {
    const student = fromSupabaseStudentRow({ id: "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a", qr_id: "20418", nfc_id: " 04A1B2C3D4 ", name: "思𤦭", points: 7 });
    expect(student).toEqual({ id: "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a", qrCode: "20418", nfcCode: "04A1B2C3D4", name: "思𤦭", points: 7 });
    expect(toSupabaseStudentRow(student)).toEqual({ id: "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a", qr_id: "20418", nfc_id: "04A1B2C3D4", name: "思𤦭", points: 7 });
  });

  it("omits an unset NFC Code instead of serializing it as a null client value", () => {
    expect(fromSupabaseStudentRow({ id: "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a", qr_id: "20418", nfc_id: null, name: "思𤦭", points: 7 })).toEqual({ id: "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a", qrCode: "20418", name: "思𤦭", points: 7 });
  });

  it("rejects a non-UUID internal ID before it can be written to Supabase", async () => {
    await expect(replaceSnapshot({ students: [{ id: "20418", qrCode: "20418", nfcCode: "04A1", name: "思𤦭", points: 0 }], logs: [] })).rejects.toThrow("UUID");
  });

  it("rejects malformed compact JWS tokens", async () => {
    await expect(verifySyncToken("not-a-jwt")).rejects.toThrow();
    await expect(verifySyncToken("header.payload")).rejects.toThrow();
    await expect(verifySyncToken("eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjF9.invalid-signature")).rejects.toThrow();
  });

  it("exposes the same snapshot to two independent sync sessions", async () => {
    const firstToken = await createSyncToken("1234");
    const secondToken = await createSyncToken("1234");
    await expect(verifySyncToken(firstToken)).resolves.toMatchObject({ scope: "points:sync" });
    await expect(verifySyncToken(secondToken)).resolves.toMatchObject({ scope: "points:sync" });
    const firstSnapshot = await readSnapshot();
    const secondSnapshot = await readSnapshot();
    expect(secondSnapshot).toEqual(firstSnapshot);
  }, 20_000);
});
