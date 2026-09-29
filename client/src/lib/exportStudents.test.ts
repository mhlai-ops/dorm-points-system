import { describe, expect, it, vi } from "vitest";
import { exportStudentsToExcel } from "./exportStudents";

vi.mock("xlsx", () => ({
  utils: {
    book_new: vi.fn(() => ({ Sheets: {}, SheetNames: [] })),
    json_to_sheet: vi.fn((rows: unknown[]) => ({ rows })),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
}));

describe("宿生 Excel 匯出", () => {
  it("包含指定宿生欄位並使用 YYYYMMDD 檔名", async () => {
    const XLSX = await import("xlsx");
    const filename = exportStudentsToExcel([{
      name: "思𤦭", room: "A-101", className: "小六甲", staffInCharge: "陳老師",
      points: 15, qrCode: "20418", nfcCode: "04A1",
    }], new Date(2026, 8, 29));
    expect(filename).toBe("宿生分數紀錄_20260929.xlsx");
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([expect.objectContaining({
      "姓名": "思𤦭", "房號": "A-101", "班別": "小六甲", "個案職員": "陳老師", "最新分數": 15,
    })]);
    expect(XLSX.writeFile).toHaveBeenCalledWith(expect.anything(), filename);
  });
});
