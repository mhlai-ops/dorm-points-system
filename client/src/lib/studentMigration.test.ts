import { describe, expect, it } from "vitest";
import { isUuid, migrateStudentStorage, shouldSeedRemoteSnapshot } from "./studentMigration";

describe("student storage migration", () => {
  it("upgrades legacy IDs to UUIDs while preserving their QR Code and log relationship", () => {
    const result = migrateStudentStorage(
      [{ id: "20418", name: "思𤦭", points: 5, nfcCode: "04A1" }],
      [{ id: "log-1", studentId: "20418", at: "2026-08-18T00:00:00.000Z", item: "舍務", delta: 5, balance: 5 }],
      () => "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a",
    );

    expect(result.students[0]).toMatchObject({ id: "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a", qrCode: "20418", nfcCode: "04A1" });
    expect(result.logs[0]?.studentId).toBe("b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a");
  });

  it("does not replace already valid internal UUIDs", () => {
    const uuid = "b8c7a232-5dcf-4c4c-b81a-0a2c9d6f7e0a";
    const result = migrateStudentStorage([{ id: uuid, qrCode: "20418", name: "思𤦭", points: 0 }], [], () => "unused");
    expect(isUuid(result.students[0]!.id)).toBe(true);
    expect(result.students[0]).toMatchObject({ id: uuid, qrCode: "20418" });
  });

  it("only seeds an empty remote snapshot when local students exist", () => {
    expect(shouldSeedRemoteSnapshot(0, 2)).toBe(true);
    expect(shouldSeedRemoteSnapshot(2, 2)).toBe(false);
    expect(shouldSeedRemoteSnapshot(0, 0)).toBe(false);
  });
});
