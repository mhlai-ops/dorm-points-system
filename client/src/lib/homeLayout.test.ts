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

  it("提供全體宿生積分彈窗入口、快速搜尋及關閉機制", () => {
    const searchSection = source.slice(source.indexOf("function Search"), source.indexOf("function Points"));
    expect(searchSection).toContain("查看全體宿生積分");
    expect(searchSection).toContain("student-list-modal-backdrop");
    expect(searchSection).toContain("student-list-close");
    expect(searchSection).toContain("快速搜尋姓名、QR 或 NFC Code");
    expect(searchSection).toContain("setListModalOpen(false)");
    expect(searchSection).not.toContain("autoFocus");
    expect(searchSection).not.toContain(".focus()");
  });

  it("彈窗列表只提供查看積分卡片，不放刪除入口", () => {
    const searchSection = source.slice(source.indexOf("function Search"), source.indexOf("function Points"));
    expect(searchSection).toContain("student-info-row");
    expect(searchSection).toContain("s.points");
    expect(searchSection).not.toContain("刪除宿生");
    expect(searchSection).not.toContain("delete-student");
  });

  it("把編輯及刪除管理動作放在選取宿生的積分頁", () => {
    const pointsSection = source.slice(source.indexOf("function Points"), source.indexOf("function Celebration"));
    expect(pointsSection).toContain("編輯宿生資料");
    expect(pointsSection).toContain("刪除宿生");
    expect(pointsSection).toContain("onEdit");
    expect(pointsSection).toContain("onDelete");
  });
});
