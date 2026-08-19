import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";

const testContext = {} as TrpcContext;

describe("sync.login credentials", () => {
  it("accepts the server-side configured credential and rejects the retired 1234 account", async () => {
    const account = process.env.DORM_SYNC_ACCOUNT;
    const password = process.env.DORM_SYNC_PASSWORD;
    expect(account).toBeTruthy();
    expect(password).toBeTruthy();

    const caller = appRouter.createCaller(testContext);
    await expect(caller.sync.login({ account: account!, password: password! })).resolves.toMatchObject({ token: expect.any(String) });
    await expect(caller.sync.login({ account: "1234", password: "1234" })).rejects.toThrow("帳戶號碼或帳戶密碼不正確");
  });
});
