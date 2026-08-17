# Supabase 同步整合診斷

- 2026-08-17：第一次全端同步預覽仍使用 `vite --host`，因此 `/api/trpc/sync.login` 回傳 HTTP 404。
- 已確認 REST/curl：`server/_core/index.ts` 掛載 `/api/trpc` 後，`sync.login` 回傳 HTTP 200 及 token。
- 已將 `package.json` 的 `dev` 改為 `NODE_ENV=development tsx watch server/_core/index.ts`。
- 已將 `build:full` 改為以 `server/_core/index.ts` 進行 esbuild。
- 重啟後 dev server 在 localhost:3000 成功啟動，Express、Vite 及 tRPC 路由已掛載。
- 瀏覽器曾短暫顯示 Error Boundary，重新載入後回到登入頁；需要再以 1234／1234 驗證登入及 snapshot。
- `pnpm check`、`pnpm test`（2 tests passed）及 `pnpm build:full` 均成功。

## 瀏覽器驗證

全端 server 重啟後，固定帳密 1234／1234 可透過 `/api/trpc/sync.login` 登入，搜尋頁可載入思𤦭與楚榆，手動刷新顯示「資料已更新」，表示 tRPC snapshot 路由可用。進入思𤦭積分頁後執行舍務 +1，畫面即時更新為 1 分並顯示陽光公仔鼓勵動畫；但頁首顯示「雲端同步失敗，資料暫時保留在本機」。

目前最可能原因是 Supabase server-side credentials 尚未完成設定：`SUPABASE_SERVICE_ROLE_KEY` 尚未由使用者透過 secrets 卡提供，或 `SUPABASE_URL`／service key 尚未有效注入。跨裝置寫入在拿到 server key 前不能宣稱完成。
