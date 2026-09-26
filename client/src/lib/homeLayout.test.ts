import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");

describe("晨樂加油站首頁佈局", () => {
  it("移除首頁快捷清單，避免在首頁直接誤觸編輯或刪除", () => {
    const searchSection = source.slice(source.indexOf("function Search"), source.indexOf("function Points"));
    expect(searchSection).not.toContain("快捷清單");
    expect(searchSection).not.toContain("quick-grid");
    expect(searchSection).not.toContain("onDelete");
    expect(searchSection).not.toContain("onEdit");
  });

  it("保留預設收起的宿生積分資訊專區及搜尋入口", () => {
    expect(source).toContain('useState(false)');
    expect(source).toContain('student-info-section ${infoOpen ? "is-open" : ""}');
    expect(source).toContain("宿生積分資訊");
    expect(source).toContain("預設隱藏名單");
    expect(source).toContain("student-info-row");
  });

  it("把編輯及刪除管理動作放在選取宿生的積分頁", () => {
    const pointsSection = source.slice(source.indexOf("function Points"), source.indexOf("function Celebration"));
    expect(pointsSection).toContain("編輯宿生資料");
    expect(pointsSection).toContain("刪除宿生");
    expect(pointsSection).toContain("onEdit");
    expect(pointsSection).toContain("onDelete");
  });
});
