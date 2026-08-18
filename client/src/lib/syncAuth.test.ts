import { describe, expect, it } from "vitest";
import { isRecoverableSyncAuthError } from "./syncAuth";

describe("isRecoverableSyncAuthError", () => {
  it("recognizes expired sync sessions for controlled logout handling", () => {
    expect(isRecoverableSyncAuthError(new Error("Sync session expired"))).toBe(true);
    expect(isRecoverableSyncAuthError(new Error("Invalid Compact JWS"))).toBe(true);
  });

  it("does not hide unrelated API failures", () => {
    expect(isRecoverableSyncAuthError(new Error("Supabase request failed"))).toBe(false);
  });
});
