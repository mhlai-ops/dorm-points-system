# 晨樂加油站方案 B 後端同步待辦

- [ ] 將專案升級為具備後端 API、資料庫及 secrets 管理的全端架構。
- [ ] 設定 Supabase URL 與 server-side service key，絕不暴露到前端或 GitHub。
- [ ] 保留前端 1234／1234 登入，建立後端代理認證與 API 保護。
- [ ] 建立宿生、積分異動、修改及撤銷的共享 API。
- [ ] 加入 5–10 秒輪詢、手動刷新、下拉刷新及返回前景自動更新。
- [ ] 保留 LocalStorage 作為本機快取／離線 fallback。
- [ ] 完成跨裝置測試、build、部署與 checkpoint。

---

# 晨樂加油站 Supabase 跨裝置同步待辦

- [ ] 準備 Supabase Project URL、Anon Key 及資料庫權限設定。
- [ ] 將宿生與積分異動建立為共享資料表／API 資料層。
- [ ] 保留 LocalStorage 作為本機快取及離線 fallback。
- [ ] 加入 Supabase Realtime 訂閱，並以 5–10 秒輪詢作備援。
- [ ] 加入手動更新按鈕、手機下拉刷新及返回前景自動更新。
- [ ] 測試不同裝置的新增宿生、加減分、修改、撤銷同步。
- [ ] 完成 build、部署及 checkpoint。

---

# 晨樂加油站跨裝置資料同步待辦

- [ ] 確認跨裝置共享資料來源方案。
- [ ] 將宿生及積分異動從純 LocalStorage 擴展到共享後端資料來源。
- [ ] 加入 5–10 秒背景輪詢或即時訂閱。
- [ ] 加入手動更新按鈕、手機下拉刷新及返回前景自動更新。
- [ ] 保留 LocalStorage 作為本機快取／離線 fallback，避免資料層切換時白畫面。
- [ ] 完成跨裝置測試、build、checkpoint 及部署驗證。

---

# 晨樂加油站 Chrome 白畫面修正待辦

- [ ] 在 index.html 加入根節點錯誤與未捕捉 Promise 的全域降級畫面。
- [ ] 檢查並確認沒有註冊 Service Worker 或 PWA 快取造成 Chrome 請求死鎖。
- [ ] 檢查 Safari／Chrome API 使用位置，加入安全 feature detection 及 fallback。
- [ ] 確認 Vite base 為 `/`、SPA `_redirects` 存在、Router 不依賴 User-Agent。
- [ ] 執行 TypeScript、production build 及 Chrome／無痕模式資源驗證。
- [ ] 建立 commit 並 Push 到 GitHub main。

---

# 晨樂加油站 Remember Me 待辦

- [ ] 登入頁加入預設勾選的「保持登入狀態」Checkbox。
- [ ] 勾選時將登入 token/state 寫入 localStorage。
- [ ] 未勾選時將登入 token/state 寫入 sessionStorage。
- [ ] App 啟動時依序檢查 localStorage、sessionStorage 並恢復登入。
- [ ] 登出時同時清除 localStorage 與 sessionStorage 的登入紀錄。
- [ ] 加入手機版 Checkbox 樣式並完成 TypeScript、build 及 GitHub Push。

---

# 晨樂加油站持久化登入待辦

- [ ] 檢查現有 Login、PageShell 及 Home 導航流程。
- [ ] 成功登入後將 authentication token/state 安全寫入 localStorage。
- [ ] 啟動時讀取並驗證登入紀錄，自動恢復 search 頁。
- [ ] 在搜尋、積分及明細頁提供登出按鈕。
- [ ] 登出時清除 localStorage 登入紀錄並返回登入頁。
- [ ] 執行 TypeScript、production build 及登入流程驗證。
- [ ] 建立 commit 並 Push 到 GitHub main。

---

# 晨樂加油站白畫面穩定性優化待辦

- [ ] 檢查並完善 React Error Boundary，捕捉初始化及渲染錯誤。
- [ ] 封裝所有 LocalStorage 讀取，加入 try/catch、資料驗證及預設 fallback。
- [ ] 確認 Vite production JS/CSS 輸出使用完整 hash 檔名及正確 index 引用。
- [ ] 執行 TypeScript、production build 及輸出資源驗證。
- [ ] 建立 commit 並 Push 到 GitHub main。

---

# 晨樂加油站 Cloudflare SPA fallback 待辦

- [ ] 在 client/public/ 新增 `_redirects`。
- [ ] 寫入 `/*    /index.html   200`，讓非首頁刷新回到 SPA 入口。
- [ ] 確認 build 後檔案存在於 dist/public/_redirects。
- [ ] 建立 commit 並 Push 到 GitHub main，觸發 Cloudflare Pages 重新部署。

---

# 晨樂加油站 Blank Page 修正待辦

- [ ] 檢查 vite.config.ts 是否設定 `base: '/'`。
- [ ] 檢查 build 後 index.html 的 JS、CSS 及圖片引用是否為正確根路徑。
- [ ] 確認 dist/public 內存在所有必要資源。
- [ ] 修正前端資產引用或 Vite 設定，避免 pages.dev 出現 Blank Page。
- [ ] 執行 TypeScript、production build 及資源路徑檢查。
- [ ] 建立並 Push 新 commit 到 GitHub。

---

# 晨樂加油站 Logo 資產修正待辦

- [ ] 檢查 Logo 圖片檔案實際位置及 Git 追蹤狀態。
- [ ] 檢查 Home.tsx、index.html 及 CSS 的 Logo 引用路徑。
- [ ] 將 Logo 放入 client/public 可部署靜態資產路徑，或改用正確 import。
- [ ] 修正 favicon、頁首及登入頁引用，避免使用不存在的 /manus-storage URL。
- [ ] 執行 TypeScript、production build 及圖片檔案存在驗證。
- [ ] 建立並 Push 新 commit，觸發 Cloudflare Pages 重新部署。

---

# 晨樂加油站 Cloudflare Pages 部署修正待辦

- [ ] 檢查 package.json 的 scripts、build 指令及輸出目錄。
- [ ] 確認 Cloudflare Pages 應使用 Vite 靜態輸出 dist/public 或正確輸出目錄。
- [ ] 修正 build 指令，避免把 Express server bundle 當成 Pages 靜態部署必要步驟。
- [ ] 執行 TypeScript check 及 production build。
- [ ] 建立並 Push 新 commit，觸發 Cloudflare Pages 重新部署。

---

# 晨樂加油站登入帳號更新待辦

- [ ] 將登入帳戶設定為 1234。
- [ ] 將登入密碼設定為 1234。
- [ ] 正確帳密才可進入搜尋頁，錯誤帳密顯示提示並停留登入頁。
- [ ] 完成 TypeScript、production build 及登入流程驗證。
- [ ] 更新 GitHub 儲存庫至最新 commit。

---

# 晨樂加油站 GitHub 推送待辦

- [ ] 確認目前專案工作樹及 GitHub 登入帳號。
- [ ] 建立私人 GitHub 儲存庫「積分系統」。
- [ ] 推送目前完整 App 程式碼及最新跨平台 QR 掃描功能。
- [ ] 驗證遠端儲存庫、分支及最新 commit。
- [ ] 回覆 GitHub 儲存庫連結及推送結果。

---

# 晨樂加油站跨平台 QR 掃描待辦

- [ ] 移除原生 BarcodeDetector 相依。
- [ ] 導入 html5-qrcode 或同等跨平台 QR Code 掃描套件。
- [ ] 確保 iPhone Safari 與 Android 可透過 HTTPS 相機讀取 QR Code。
- [ ] 保留相機權限拒絕、無法開啟鏡頭及掃描失敗提示。
- [ ] 掃描成功後維持現有宿生對應及自動跳轉積分頁。
- [ ] 保留 Web NFC、文字搜尋及相容性降級流程。
- [ ] 完成 TypeScript、production build、手機版驗證與 checkpoint。

---

# 晨樂加油站 Web NFC 待辦

- [ ] 在搜尋頁加入 Web NFC 讀取入口。
- [ ] 使用 NDEFReader 讀取 NFC 卡片內的文字或 URI ID。
- [ ] 支援解析 20418、20409 等宿生 ID，成功後自動選取並跳轉積分頁。
- [ ] 不支援 Web NFC 的瀏覽器自動隱藏 NFC 入口，保留 QR Code 及文字搜尋。
- [ ] 加入 HTTPS、權限拒絕、讀取失敗及找不到宿生的友善提示。
- [ ] 停止讀取時清理 NFC scan session，避免重複監聽。
- [ ] 完成 TypeScript、production build、手機版驗證與 NFC 版本 checkpoint。

---

# 晨樂加油站分數修正待辦

- [ ] 在每筆分數明細加入「修改分數」入口。
- [ ] 修改表單支援輸入新的正負分數及異動項目名稱。
- [ ] 修改後依時間順序重新計算該宿生每筆紀錄的餘額及目前總積分。
- [ ] 保留原有撤銷功能，並將修正結果保存至 LocalStorage。
- [ ] 完成正負分數、防止總分負數、手機版及 production build 測試。

---

# 晨樂加油站宿生資料管理待辦

- [ ] 在搜尋頁每位宿生卡片加入編輯及刪除操作。
- [ ] 編輯表單支援修改姓名與 QR Code ID。
- [ ] 修改 QR Code ID 時檢查是否與其他宿生重複。
- [ ] 刪除前顯示確認提示，刪除後同步更新 LocalStorage。
- [ ] 編輯後同步更新搜尋、自動完成、快捷清單及目前選取資料。
- [ ] 完成手機版視覺、TypeScript、production build 與 checkpoint。

---

# 晨樂加油站功能升級待辦

- [ ] 在宿生搜尋頁加入「增加宿生」按鈕及表單。
- [ ] 新增宿生需輸入姓名及 QR Code ID，初始化積分為 0。
- [ ] 將新增宿生保存至 LocalStorage，並即時出現在搜尋及快捷清單。
- [ ] 成功加分時顯示陽光公仔彈跳動畫。
- [ ] 成功加分時顯示全螢幕鼓勵提示及新增宿生姓名、加分數。
- [ ] 提供關閉／繼續操作入口，並尊重 reduced motion。
- [ ] 完成手機版流程測試、production build 與 checkpoint。

---

# 晨樂加油站品牌更新待辦

- [ ] 將產品名稱由「舍務簿」全面改為「晨樂加油站」。
- [ ] 將使用者提供的陽光公仔導入為 App Icon、頁首品牌圖像及登入頁主視覺。
- [ ] 保留藍黃色兒童向配色、音效及 Haptic Feedback 功能。
- [ ] 更新瀏覽器標題、描述及品牌文案。
- [ ] 完成手機版預覽、TypeScript 檢查、production build 與 checkpoint。

---

# 舊版升級待辦

- [ ] 將全域背景、品牌色與主要按鈕改為兒童向藍黃色配色。
- [ ] 增加適合小學生的圓潤字體、插畫感裝飾、較大的觸控按鈕與清晰狀態色。
- [ ] 保留四頁 SPA、LocalStorage、預載宿生、QR Code 掃描與積分防呆邏輯。
- [ ] 為成功加分加入明亮獎勵音效及短震動。
- [ ] 為成功扣分／兌換獎勵加入不同音效及短震動。
- [ ] 為積分不足加入錯誤提示音效與較短警示震動。
- [ ] 在不支援 AudioContext 或 navigator.vibrate 的裝置上優雅降級。
- [ ] 完成手機版視覺與 production build 驗證，保存新 checkpoint。

---

# 晨樂加油站安全 Secrets 重設待辦

- [x] 重新發出 `SUPABASE_SERVICE_ROLE_KEY` 安全 Secrets 設定請求。
- [x] 只接受管理介面 Secrets 卡片輸入，拒絕聊天中公開的 key。
- [x] 驗證 server-side Supabase credentials 可讀寫共享資料。
- [x] 完成加分、修改、撤銷及跨裝置 snapshot 測試。
- [ ] 完成 build、checkpoint 及部署驗證。

- [x] 重新驗證「修改分數」操作會成功寫入 Supabase，且重新整理後快照一致。
- [x] 重新驗證「撤銷」操作會成功寫入 Supabase，且重新整理後快照一致。
- [x] 以第二個瀏覽器工作階段／裝置模擬跨裝置測試，確認一端更新後另一端可透過 polling 或手動刷新看到最新資料。

---

# 晨樂加油站初始化與同步錯誤修復待辦

- [x] 修正 index.html inline fallback script 的 Invalid regular expression flags。
- [x] 確保未取得有效登入 token 前不建立或執行 sync.snapshot 查詢。
- [x] 修正同步查詢錯誤處理，避免空 token 觸發 API Query Error。
- [x] 修正 production start 對 dist/index.js 缺失的部署啟動問題。
- [x] 通過 TypeScript、Vitest、production build、瀏覽器初始化及登入同步驗證。
- [x] 保存新的修正版 checkpoint 並確認部署啟動。

---

# 晨樂加油站 Invalid Compact JWS 修復待辦

- [x] 檢查 sync token 的 localStorage/sessionStorage 讀取、保存與 JWT 驗證流程。
- [x] 讓格式錯誤或已失效 token 自動清除並回到登入頁，不再持續觸發 snapshot API Query Error。
- [x] 修正 snapshot query 的 JWT 錯誤降級與重新登入流程。
- [x] 新增或更新 Vitest 覆蓋 invalid token 與 token expiry handling。
- [x] 完成 TypeScript、Vitest、build、瀏覽器重新登入及 snapshot 驗證。
- [ ] 保存新的修正版 checkpoint 並確認部署狀態。

---

# Cloudflare Pages 最新部署驗證待辦

- [x] 檢查 GitHub main 最新 commit 是否包含 JWS 修正版。
- [x] 確認 Cloudflare Pages 專案是否連接正確 GitHub repository 與 main 分支。
- [x] 如未自動觸發，推送最新 commit 觸發 Cloudflare Pages 部署。
- [x] 檢查最新 Cloudflare deployment status 及 production URL。
- [x] 驗證 production 版本不再出現 Invalid Compact JWS。

---

# 晨樂加油站手機版刷新按鈕修復待辦

- [x] 檢查 PageShell 頁首刷新按鈕的 JSX 與 mobile CSS。
- [x] 確保搜尋、積分及歷史頁手機版都顯示可操作的刷新按鈕。
- [x] 以手機 viewport 驗證按鈕可見、可點擊並觸發資料刷新。
- [x] 完成測試、保存 checkpoint 及回報修正版本。

---

# 手機版刷新修正版 Cloudflare 推送待辦

- [x] 確認手機刷新按鈕變更已存在工作樹且 GitHub main 未包含。
- [x] 將手機刷新修正版提交並推送至 GitHub main。
- [x] 確認 Cloudflare Pages 自動部署已被觸發。
- [x] 核對 production URL 可載入及刷新功能版本狀態。

---

# 登入同步服務錯誤調查待辦

- [x] 檢查登入 mutation、前端錯誤處理及重複提交行為。
- [x] 驗證多裝置是否可各自取得獨立同步 token。
- [x] 檢查 Cloudflare production 的 tRPC API 路由及 server bundle 可用性。
- [x] 修正登入失敗提示、重複提交保護或部署路由問題。
- [x] 完成本機及 production 登入同步測試並保存版本。

- [x] 修正 Cloudflare Pages 靜態站點呼叫 `/api/trpc` 回傳 405 的 production API 路徑。
- [x] 為可用的全端 server 加入 Cloudflare Pages origin 的 CORS 支援。
- [x] 驗證 Cloudflare production 登入可取得 sync token，且多裝置各自登入不互相登出。

- [x] 完成本次登入同步修正後的 GitHub main push。
- [x] 觸發並核對 Cloudflare Pages deployment。
- [x] 在 production 驗證登入 API、重複點擊防護及多裝置 token。

---

# Cloudflare production 登入及加分實測待辦

- [x] 將登入同步修正版推送到 GitHub main。
- [x] 確認 Cloudflare Pages 已部署最新 frontend endpoint 修正。
- [x] 在 production 使用 1234/1234 登入並選取思𤦭。
- [x] 在 production 加分一次，確認沒有同步錯誤且顯示成功提示。
- [x] 重新刷新或重新登入，確認加分已保存到共享 Supabase snapshot。

---

# Sync session expired 錯誤修復待辦

- [x] 定位過期 sync token 在背景輪詢、焦點恢復與手動刷新時仍觸發 API Query Error 的路徑。
- [x] 將可預期的 `Sync session expired` 處理為 session 清理與登入頁降級，不再輸出全域 API Query Error。
- [x] 驗證過期 token、重新登入及 snapshot polling 流程。
- [x] 完成 TypeScript、Vitest 及 production build 驗證。
- [x] 重新登入後等待或觸發 snapshot polling，確認查詢恢復且 console 無 API Query Error。
- [x] 確認 snapshot query 已停用過期 token 的自動 retry，並完成回歸驗證。
- [x] 保存本次 Sync session expired 修正版 checkpoint。
- [x] 推送修正版至 GitHub main 並觸發 Cloudflare Pages 部署。
- [x] 在 production 驗證過期 session 降級後不再出現全域 API Query Error。

---

# 宿生 QR Code 與 NFC Code 分離待辦

- [x] 為每位宿生資料模型新增獨立的 `qrCode` 與 `nfcCode` 欄位，並設計現有資料升級策略。
- [x] 更新新增／編輯宿生表單，讓 QR Code 與 NFC Code 可分開輸入並分別驗證重複值。
- [x] 更新文字搜尋、QR 掃描及 NFC 讀取，分別以對應 Code 尋找同一位宿生。
- [x] 驗證 LocalStorage 與 Supabase snapshot 的向後相容、跨裝置同步、build 及部署。
- [x] 在截圖所示的「編輯宿生資料」視窗，於 QR Code ID 下方新增「NFC Code／UID（選填）」輸入欄位。
- [x] 儲存後以 NFC Code／UID 作為 NFC 嗶卡的優先辨識值，並在手機版確認欄位清晰可填寫。
- [x] 將 `Student`／`SyncStudent` 改為包含內部 `id`、`qrCode` 及 `nfcCode`，並將舊 LocalStorage 資料安全升級。
- [x] 將 QR 掃描、文字搜尋、畫面顯示及 Supabase round-trip 改為使用獨立 `qrCode`；NFC 嗶卡只以 `nfcCode` 優先識別。
- [x] 新增 QR Code 欄位的 regression tests，覆蓋舊資料升級、重複值檢查與同步資料合約。
- [x] 將舊 LocalStorage 及預載宿生升級為 UUID 格式內部 ID，避免非 UUID 寫入 Supabase `students.id`。
- [x] 補上首次空遠端 seed、舊資料升級、QR／NFC 重複值與 snapshot round-trip 的 UUID 安全回歸測試。
- [x] 明確驗證 `qrCode` 與 `nfcCode` 經 Supabase `replaceSnapshot()`／`readSnapshot()` 後的值完全一致。
- [x] 以 UUID 升級後的舊 LocalStorage 資料驗證 seed／save 不會向 Supabase `students.id` 寫入非 UUID 值。
- [x] 在 tRPC snapshot 讀取邊界正規化空白 NFC Code，避免跨裝置快照的 `null` 值被後續儲存操作送回 API。

---

# 晨樂加油站 PWA 與主畫面 App Icon 待辦

- [x] 檢查現有 `client/index.html`、`client/public/` 與建置輸出，確認 PWA 設定切入點。
- [x] 將使用者提供的方形品牌圖片轉換為 `/icon.png`，供 iOS、Android 及 Manifest 共用。
- [x] 在 HTML head 加入 Apple Touch Icon、標準 192px icon、Manifest 及全螢幕 web app meta 標籤。
- [x] 新增 `client/public/manifest.json`，設定晨樂加油站名稱、standalone 顯示模式、開始網址、配色與 192／512 圖示。
- [x] 新增自動化檢查，驗證 PWA HTML meta、Manifest 及 icon 檔均會輸出到 production build。
- [x] 完成 TypeScript、Vitest、production build、手機／production PWA 資產檢查、checkpoint、GitHub main push 及 Cloudflare Pages 部署驗證。

---

# 晨樂加油站登入帳號更新待辦

- [x] 定位目前固定登入憑證及相關回歸測試，確認不會遺漏舊帳號。
- [x] 移除 `1234 / 1234` 舊登入憑證，改為帳號 `boarding` 與使用者指定的新密碼。
- [x] 更新登入測試，驗證新憑證可登入且舊 `1234 / 1234` 會被拒絕。
- [ ] 完成 TypeScript、Vitest、production build、瀏覽器登入驗證、checkpoint、GitHub main push 及 Cloudflare Pages 部署驗證。
- [x] 移除登入頁硬編碼的 `1234 / 1234` 前端預檢，改由伺服器端新憑證統一驗證並顯示正確錯誤提示。
