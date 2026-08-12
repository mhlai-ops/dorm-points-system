# Web NFC 實作備註

本專案採用 Web NFC 的 NDEFReader 讀取方式。根據 MDN 與 Chrome 官方文件，Web NFC 屬於 limited availability 的實驗性 API，只能在 HTTPS secure context、頂層頁面及使用者手勢觸發的 scan() 流程使用。Web NFC 主要支援 NDEF tag，不提供低階 NFC-A／ISO-DEP 等操作。

本功能會從 NDEFReadingEvent 的 message.records 解析 text、url、mime 或一般 payload 內容，並以內容中的宿生 ID（例如 20418、20409）對應現有宿生。官方文件亦列出 reading 事件的 serialNumber 欄位，但實際裝置及瀏覽器可能沒有提供，因此 serialNumber 只作備援解析，不能取代卡片內寫入的 NDEF ID。

若 NDEFReader 不存在，搜尋頁不顯示 NFC 入口，使用者繼續使用 QR Code 掃描及文字搜尋。若 scan() 被拒絕、裝置沒有 NFC、NFC 未開啟或卡片不是可讀 NDEF，則顯示友善錯誤並保持其他搜尋方式可用。

參考資料：
- https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API
- https://developer.mozilla.org/en-US/docs/Web/API/NDEFReader
- https://developer.chrome.com/docs/capabilities/nfc
