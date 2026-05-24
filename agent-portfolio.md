# Agent Portfolio 企劃藍圖

## 1. 專案目的與核心願景

本專案是一個高質感個人作品集網站，目標不是單純展示履歷，而是透過網站本身的資訊架構、內容管理方式、效能策略與互動細節，向面試官證明開發者具備前端工程、後端思維、型別設計與系統維護能力。

核心定位：

- **面向面試官與技術主管**：讓使用者在 30 秒內理解開發者的技術方向、代表作品與職涯敘事。
- **低成本且可維護**：靜態內容由前端管理，作品資料由 Contentful 管理，避免免費後端服務冷啟動造成的體驗問題。
- **展示技術轉型能力**：聚焦從 MERN 全端經驗延伸到 .NET Core、Entity Framework Core、SQL Server 的學習與實作能力。

## 2. 技術策略

本專案採用前端主導的 Jamstack 架構，重點放在快速載入、型別安全、內容可維護與部署簡潔。

- **Framework**：Vite + React + TypeScript。
- **Styling**：Tailwind CSS v4 搭配 `portfolio_design_system.html` 的 CSS variables、字體、色彩與 editorial layout 視覺規範。
- **Data Fetching**：TanStack Query 負責 Contentful API 的非同步狀態、快取與錯誤狀態。
- **CMS**：Contentful 管理 Projects 資料與多語系欄位。
- **Routing**：正式實作需加入 `react-router-dom`，支援首頁與專案詳情頁。
- **i18n**：v1 採用純 React Context + typed dictionary；Contentful 動態資料使用 Contentful locale 查詢。
- **Theme**：使用 root class 或 `data-theme` 搭配 CSS variables，支援深淺色、localStorage 記憶與系統偏好偵測。
- **Hosting**：Vercel 部署，GitHub push 觸發 build。

## 3. 內容與頁面區塊

### Hero

首頁首屏要避免常見模板感，採用不對稱 editorial layout。主標題應直接說明開發者定位，副標題補充技術轉型與工程價值。

建議文案：

- 主標題：`專注於高穩定度後端架構的 React 全端工程師`
- 副標題：`擁有紮實的 MERN 實戰開發經驗，目前正全面深化 .NET Core、Entity Framework Core 與 SQL Server 技術，致力於打造型別安全、易於維護的企業級系統。`

主要互動：

- `瀏覽精選作品`：平滑滾動至 Projects 區塊。
- `檢視我的履歷`：以新分頁開啟外部履歷連結。若尚未提供履歷 URL，先隱藏或顯示 disabled 狀態，不放假連結。

### About

About 區塊負責建立職涯敘事，重點放在「透過專案實戰與逆向工程掌握技術底層」。

建議文案：

- 核心引言：`「比起死記理論，我更熱衷於透過專案實戰與逆向工程來掌握技術底層。」`
- 內文：`畢業於資訊管理學系。曾於訊光科技 (Infolight) 擔任軟體工程師，期間深入探索全端開發的整合與重構。我善於利用 GitHub Copilot 等 AI 工具輔助開發，在短時間內完成新框架的逆向學習與架構跨越，並能獨立建置具備完整商業邏輯的專案。`

若尚未提供個人照片，使用符合設計系統的抽象技術視覺或保留影像框架，不使用低質感 placeholder。

### Skills

Skills 區塊用分類式技能牆呈現，不使用百分比進度條。

資料需抽離成 typed config，不直接寫死在 JSX 內：

- Frontend：React, JavaScript (ES6+), TypeScript, TanStack Query, Tailwind CSS
- Backend & DB：C#, ASP.NET Core WebAPI, Entity Framework Core, Express, SQL Server, MongoDB
- Tools：Git, GitHub, Vercel, Render, GitHub Copilot

每個技能可搭配文字、簡潔圖示與 hover 狀態。官方 logo 若未建立資產，先使用一致的文字式 badge，避免混用風格不一的外部圖檔。

### Experience

Experience 區塊以清楚時間軸或職責清單呈現。

內容架構：

- 職稱與公司：`全端軟體工程師 | 訊光科技 (Infolight)`
- 在職時間：待補真實年月，格式固定為 `YYYY.MM - YYYY.MM` 或 `YYYY.MM - Present`
- 職責要點：
  - 架構優化：將既有專案逐步重構為 TypeScript 架構，抽離 API 請求邏輯，提升重用性與型別安全。
  - 資料流管理：導入 TanStack Query 管理前端資料快取與更新流程，降低重複請求並改善載入體驗。

在職時間未補前，正式站台不應出現 `[請在此填入...]` 這類編輯文字。

### Projects

Projects 是主要展示區。首頁呈現專案列表，點擊卡片導向 `/project/:id` 詳情頁。

專案詳情頁需包含：

- 專案名稱、分類、摘要與技術標籤。
- 技術挑戰、解決方案與成果說明。
- 多圖或 GIF gallery，支援前後切換。
- GitHub 連結與可選的 demo 連結。

TypeScript 介面：

```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  images: string[];
  techTags: string[];
  summary: string;
  challenge: string;
  solution: string;
  githubUrl: string;
  demoUrl?: string;
}
```

CMS 回傳資料不得直接進入 component。需透過 mapper 將 Contentful raw response 轉成 `Project`，並在 mapper 處理缺漏欄位與圖片 URL 正規化。

### Contact & Footer

Contact 區塊目標是降低聯絡阻力。

- Email：顯示真實 Email，並提供一鍵複製功能。複製成功後顯示短暫 Toast。
- GitHub：新分頁開啟，使用 `target="_blank"` 與 `rel="noreferrer"`。
- Footer：簡潔顯示技術棧，例如 `Built with React, TypeScript, and Contentful.`

## 4. 多語系與主題

### i18n

v1 採用 React Context + typed dictionary，支援 `zh-TW` 與 `en`。

- 靜態文案放在語系設定檔，不散落在 component。
- 首次進站讀取瀏覽器語系，若不支援則預設 `zh-TW`。
- 使用者切換語系後寫入 localStorage。
- Contentful Projects 查詢需依目前語系帶入 locale。

### Theme

主題切換以 CSS variables 為核心，遵循 `portfolio_design_system.html`：

- Light：以 `#F5F2EC`、`#EDEAE2`、`#0D0D0D`、`#B84A2E` 為主。
- Dark：以 `#2A2825`、`#F5F2EC`、`#9A9790`、`#B84A2E` 為主。
- 切換狀態保存於 localStorage。
- 首次進站偵測 `prefers-color-scheme`。
- 在 React mount 前套用初始 theme，避免重新整理時白色閃爍。

## 5. 待補內容資產

正式實作前需補齊：

- 真實姓名或品牌名稱。
- Email。
- GitHub URL。
- 履歷 URL。
- 個人照片或可替代的主視覺。
- Infolight 在職時間。
- 作品列表、專案圖片、GitHub URL、demo URL。
- Contentful space id、environment、content type、access token。
