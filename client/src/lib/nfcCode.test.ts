import { describe, expect, it } from "vitest";
import { findStudentByNfcCode, findStudentByQrCode, isNfcCodeInUse, isQrCodeInUse, matchesStudentQuery, normalizeNfcCode } from "./nfcCode";

const students = [
  { qrCode: "20418", name: "思𤦭", nfcCode: "04A1B2C3D4" },
  { qrCode: "20409", name: "楚榆" },
];

describe("NFC Code helpers", () => {
  it("normalizes optional NFC Code values", () => {
    expect(normalizeNfcCode("  04A1B2C3D4  ")).toBe("04A1B2C3D4");
    expect(normalizeNfcCode("   ")).toBeUndefined();
    expect(normalizeNfcCode(null)).toBeUndefined();
  });

  it("prioritizes a dedicated NFC Code and falls back to a legacy QR Code", () => {
    expect(findStudentByNfcCode(students, "04A1B2C3D4")?.name).toBe("思𤦭");
    expect(findStudentByNfcCode(students, "20409")?.name).toBe("楚榆");
    expect(findStudentByQrCode(students, "20418")?.name).toBe("思𤦭");
  });

  it("includes the dedicated NFC Code in text search and duplicate checks", () => {
    expect(matchesStudentQuery(students[0]!, "A1B2")).toBe(true);
    expect(isNfcCodeInUse(students, "04A1B2C3D4")).toBe(true);
    expect(isQrCodeInUse(students, "20418")).toBe(true);
    expect(isNfcCodeInUse(students, "unused-card")).toBe(false);
  });
});
