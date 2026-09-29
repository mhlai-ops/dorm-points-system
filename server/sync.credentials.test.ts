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

describe("admin credential policy", () => {
  it("accepts the configured scrypt password and rejects incorrect or retired credentials", () => {
    const hash = "scrypt$16384$8$1$tO5PjGEn85CwnMClmVM1ZQ$CClNGhq2AwcGe2D2asUso2l5vzyDjtKVlMQFe9enCkw";
    expect(verifyPasswordHash("25511588", hash)).toBe(true);
    expect(verifyPasswordHash("1234", hash)).toBe(false);
    expect(verifyPasswordHash("wrong-password", hash)).toBe(false);
  });
});
