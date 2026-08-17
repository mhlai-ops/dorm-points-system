import { describe, expect, it } from "vitest";
import { createSyncToken, readSnapshot, replaceSnapshot, verifySyncToken } from "./supabase";

describe("Supabase server credentials", () => {
  it("can read the students table without exposing the key", async () => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(url).toBeTruthy();
    expect(key).toBeTruthy();

    const response = await fetch(`${url}/rest/v1/students?select=id&limit=1`, {
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
    expect(saved.students.length).toBe(snapshot.students.length);
    expect(saved.logs.length).toBe(snapshot.logs.length);
  }, 20_000);

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
