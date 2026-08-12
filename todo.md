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
