# 晨樂加油站｜宿生積分管理 Web App

適合手機使用的單頁宿生積分管理系統，資料使用 LocalStorage 保存。

## 功能

- 預載宿生與 QR Code ID 對應
- 文字搜尋、自動完成及 html5-qrcode 跨平台相機掃描
- Android Chrome Web NFC NDEF 宿生 ID 讀取
- 加分、獎勵兌換、音效、Haptic Feedback 及加分鼓勵動畫
- 新增、編輯、刪除宿生資料
- 分數明細、修改異動及撤銷功能

## 開發

```bash
pnpm install
pnpm dev
```

相機與 Web NFC 功能需要使用 HTTPS；iPhone Safari 使用 QR Code 掃描，Android Chrome 可使用 QR Code 及 Web NFC。
