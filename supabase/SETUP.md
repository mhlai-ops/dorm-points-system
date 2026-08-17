# 晨樂加油站 Supabase 設定步驟

## 重要安全說明

這份 SQL 將資料表的 Row Level Security（RLS）設為只允許 Supabase Auth 的 `authenticated` 使用者存取。這是安全的預設設定，但也代表目前 App 內建的示範帳號 `1234 / 1234` 尚未足以直接存取 Supabase；接入雲端同步時需要將登入流程改為 Supabase Auth，或在後端建立受保護的代理 API。請勿把 `service_role` key 放進前端、Cloudflare Pages 環境或 GitHub。

## 建立專案

請前往 [Supabase](https://supabase.com/)，登入後按 **New project**。選擇帳戶與組織，輸入專案名稱，例如 `morning-joy-points`，設定資料庫密碼並選擇鄰近區域。完成建立後，等待專案狀態變為可用。

## 執行 SQL

在 Supabase Dashboard 左側開啟 **SQL Editor**，建立 New query，將同一資料夾內的 `schema.sql` 全文貼上，然後按 **Run**。成功後可在 **Table Editor** 看到 `students` 與 `point_logs` 兩張表，並在 `students` 看到預載的 `20418 / 思𤦭` 與 `20409 / 楚榆`。

如果 SQL Editor 顯示 publication 或既有 policy 相關錯誤，請把完整錯誤訊息保留，不要自行刪除 RLS；將錯誤訊息交回後再處理會較安全。正常情況下，這份 SQL 可以重複執行而不會重複建立資料表或預載宿生。

## 建立登入使用者

在左側開啟 **Authentication → Users**，按 **Add user** 建立管理者帳戶。可以先使用電郵及密碼建立一個測試帳戶，並勾選自動確認電郵（如果你的測試環境不需要電郵驗證）。後續 App 會把現有的示範登入流程改成 Supabase Auth，令 RLS 能夠辨識已登入使用者。

目前要求的 `1234 / 1234` 是前端示範帳密，不建議直接把它當成真實 Supabase 密碼。正式使用時應使用電郵／密碼或其他 Supabase Auth 方式，並為不同管理者建立各自帳戶。

## 取得 App 連線資料

在 **Project Settings → API** 找到以下兩項資料：

| 資料 | 用途 |
|---|---|
| Project URL | Supabase 專案 API 根網址，例如 `https://xxxx.supabase.co` |
| Publishable／Anon key | 前端可用的公開 key，會受 RLS 保護 |

請只把 Project URL 和 Publishable／Anon key 提供給我。不要提供 `service_role` key、資料庫密碼或 JWT secret。這兩項資料會以部署環境變數保存，不會寫入 GitHub。

## 下一步

完成以上步驟後，請回覆以下格式：

```text
Supabase 已建立並執行 schema.sql
Project URL: https://你的專案.supabase.co
Publishable／Anon key: 你的公開 key
```

收到後，我會先接入讀取功能並保留 LocalStorage fallback，再加入新增、編輯、刪除、加分、扣分、撤銷等寫入操作。之後會加入 Realtime 訂閱、5–10 秒輪詢、手動更新按鈕、手機下拉刷新及瀏覽器返回前景刷新。
