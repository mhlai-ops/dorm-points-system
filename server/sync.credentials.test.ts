import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";
import { verifyPasswordHash } from "./supabase";

const testContext = {} as TrpcContext;

describe("admin password hashing", () => {
  const hash = "scrypt$16384$8$1$tO5PjGEn85CwnMClmVM1ZQ$CClNGhq2AwcGe2D2asUso2l5vzyDjtKVlMQFe9enCkw";

  it("verifies the configured password hash without storing plaintext", () => {
    expect(verifyPasswordHash("25511588", hash)).toBe(true);
    expect(verifyPasswordHash("wrong-password", hash)).toBe(false);
    expect(hash).not.toContain("25511588");
  });
});

describe("sync.login credentials", () => {
  it("accepts the configured account regardless of letter case and rejects the retired 1234 account", async () => {
    const account = "boarding";
    const password = process.env.DORM_SYNC_PASSWORD || "25511588";

    const caller = appRouter.createCaller(testContext);
    await expect(caller.sync.login({ account, password })).resolves.toMatchObject({ token: expect.any(String) });
    await expect(caller.sync.login({ account: account.toUpperCase(), password })).resolves.toMatchObject({ token: expect.any(String) });
    await expect(caller.sync.login({ account: "BoaRDing", password })).resolves.toMatchObject({ token: expect.any(String) });
    await expect(caller.sync.login({ account: "1234", password: "1234" })).rejects.toThrow("帳戶號碼或帳戶密碼不正確");
  });
});
