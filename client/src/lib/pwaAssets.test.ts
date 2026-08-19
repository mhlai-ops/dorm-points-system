import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "../../..");
const publicDir = path.join(projectRoot, "client", "public");

describe("PWA 主畫面設定", () => {
  it("包含 iOS、Android 與 standalone mode 所需的 HTML metadata", () => {
    const html = readFileSync(path.join(projectRoot, "client", "index.html"), "utf8");
    expect(html).toContain('<link rel="manifest" href="/manifest.json" />');
    expect(html).toContain('<link rel="apple-touch-icon" sizes="180x180" href="/icon.png" />');
    expect(html).toContain('<link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />');
    expect(html).toContain('<meta name="apple-mobile-web-app-capable" content="yes" />');
    expect(html).toContain('<meta name="mobile-web-app-capable" content="yes" />');
    expect(html).toContain('<meta name="apple-mobile-web-app-status-bar-style" content="default" />');
  });

  it("使用晨樂加油站名稱、standalone 顯示模式與同一個 PNG icon", () => {
    const manifest = JSON.parse(readFileSync(path.join(publicDir, "manifest.json"), "utf8"));
    expect(manifest).toMatchObject({ name: "晨樂加油站", short_name: "晨樂加油站", start_url: "/", display: "standalone" });
    expect(manifest.icons).toEqual([
      expect.objectContaining({ src: "/icon.png", sizes: "192x192", type: "image/png" }),
      expect.objectContaining({ src: "/icon.png", sizes: "512x512", type: "image/png" }),
    ]);
  });

  it("提供可部署的 PNG App Icon", () => {
    const iconPath = path.join(publicDir, "icon.png");
    expect(existsSync(iconPath)).toBe(true);
    expect(readFileSync(iconPath).subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  });
});
