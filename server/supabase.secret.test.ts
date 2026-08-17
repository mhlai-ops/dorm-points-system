import { describe, expect, it } from "vitest";

describe("Supabase server credentials", () => {
  it("can reach the students endpoint without exposing credentials", async () => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(url).toMatch(/^https:\/\/[a-z0-9-]+\.supabase\.co$/);
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
});
