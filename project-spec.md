# 個人作品集網站專案規格書

## 1. 專案摘要

本專案為 React + TypeScript 個人作品集網站，服務對象為面試官、技術主管與潛在合作方。網站需在首頁快速建立開發者定位，並透過精選作品詳情頁展示技術決策、問題拆解與實作能力。

核心交付：

- 一頁式首頁：Hero、About、Skills、Experience、Projects、Contact、Footer。
- 專案詳情頁：路由 `/project/:id`，展示專案技術挑戰、解法與多圖 gallery。
- Contentful 整合：Projects 由 CMS 管理，靜態個人內容由前端 typed config 管理。
- 多語系：`zh-TW` 與 `en`。
- 深淺色主題：支援 localStorage、系統偏好與防閃爍初始化。

## 2. 技術規格

### 2.1 既有技術基底

目前專案已具備：

- Vite
- React 19
- TypeScript
- Tailwind CSS v4
- TanStack Query
- Contentful SDK
- Vercel-friendly build script

### 2.2 需新增套件

正式實作需新增：

```bash
npm install react-router-dom
```

不新增 `react-i18next`。v1 以 React Context + typed dictionary 實作 i18n，降低依賴並維持足夠可讀性。

### 2.3 建議資料夾結構

```text
src/
  app/
    router.tsx
    providers.tsx
  components/
    layout/
    sections/
    ui/
  config/
    profile.ts
    skills.ts
    i18n.ts
  features/
    projects/
      api.ts
      mapper.ts
      types.ts
      ProjectCard.tsx
      ProjectGallery.tsx
      ProjectsSection.tsx
      ProjectDetailPage.tsx
  hooks/
    useTheme.ts
    useLocale.ts
  styles/
    theme.css
  App.tsx
  main.tsx
```

此結構是實作指引，不要求一次拆得過細；但 Projects、i18n、theme、profile config 必須從主要 UI 中分離。

## 3. 功能需求

### 3.1 Layout 與導覽

- 全站使用 `destijl-design-system.html` 的 editorial visual direction。
- Header 提供首頁區塊 anchor navigation、語系切換與主題切換。
- 首頁 CTA `瀏覽精選作品` 平滑滾動至 Projects。
- 外部連結一律新分頁開啟，並加上 `rel="noreferrer"`。
- RWD 需支援 mobile、tablet、desktop。

### 3.2 Hero

- 首屏需明確呈現開發者定位。
- 不採用傳統左文右圖模板感排版。
- 可使用大字、分欄、細線、序號、低調幾何背景與 editorial spacing。
- Hero 區塊不可依賴 CMS，必須在無網路或 CMS 失敗時仍正常呈現。

### 3.3 About

- 呈現個人敘事、核心引言與簡短職涯背景。
- 若未提供真實照片，使用設計系統一致的視覺框，不使用破圖或通用 avatar。
- 文案由 i18n dictionary 提供。

### 3.4 Skills

- 使用 typed config 管理技能分類與項目。
- 不使用百分比進度條。
- 技能項目至少包含 name、category、optional icon key。
- UI 需可在新增技能時自動排版。

### 3.5 Experience

- 使用 typed config 管理工作經驗。
- 在職時間欄位不得保留 `[請在此填入...]`。
- 若真實時間尚未提供，先使用 `timeRange: "To be updated"`，並在正式上線前列為內容 blocker。

### 3.6 Projects 列表

- 首頁 Projects section 使用 TanStack Query 讀取 Contentful。
- 載入中顯示符合版面高度的 skeleton 或 loading state。
- 讀取失敗時顯示 fallback projects config，並標示資料暫時無法同步。
- 無資料時顯示空狀態，不讓版面塌陷。
- 點擊專案卡片導向 `/project/:id`。

### 3.7 Project Detail

路由：

- `/`：首頁。
- `/project/:id`：專案詳情頁。
- unknown route：導回首頁或顯示簡潔 Not Found。

專案詳情頁內容：

- title
- category
- summary
- challenge
- solution
- techTags
- image gallery
- GitHub URL
- optional demo URL

Gallery 行為：

- 預設顯示第一張圖片。
- 提供上一張、下一張按鈕。
- 支援鍵盤可及性，按鈕需有 accessible label。
- 圖片缺失時顯示設計系統一致的 fallback frame。

### 3.8 Contact

- 顯示 Email。
- 點擊複製 Email 到剪貼簿。
- 成功時顯示 Toast，約 2 秒後消失。
- Clipboard API 失敗時 fallback 成 `mailto:` 或顯示可手動複製文字。

## 4. 資料與介面規格

### 4.1 Project Type

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

### 4.2 Contentful Content Type

Content type id 建議為 `project`。

欄位：

- `id`：Short text，必填，唯一 slug，例如 `car-rental`。
- `title`：Short text，必填，可 localize。
- `category`：Short text，必填，可 localize。
- `summary`：Long text，必填，可 localize。
- `challenge`：Long text，必填，可 localize。
- `solution`：Long text，必填，可 localize。
- `techTags`：Array of short text，必填。
- `images`：Array of assets，必填。
- `githubUrl`：Short text，必填。
- `demoUrl`：Short text，選填。
- `order`：Integer，選填，用於首頁排序。

### 4.3 環境變數

Vite 環境變數：

```text
VITE_CONTENTFUL_SPACE_ID=
VITE_CONTENTFUL_ENVIRONMENT=master
VITE_CONTENTFUL_ACCESS_TOKEN=
VITE_CONTENTFUL_PROJECT_CONTENT_TYPE=project
```

若任一必要環境變數缺失，Projects API 不應 throw 到 UI；改用本地 fallback data。

### 4.4 Mapper 規則

- Contentful raw response 必須透過 mapper 轉成 `Project[]`。
- UI component 只接收 `Project`，不接收 Contentful SDK 原始型別。
- `images` 需正規化為完整 `https:` URL。
- 缺失的 optional `demoUrl` 不渲染按鈕。
- 缺失的 required 欄位需讓該筆資料被濾掉，並在開發環境輸出 warning。

## 5. i18n 與 Theme 規格

### 5.1 i18n

支援語系：

- `zh-TW`
- `en`

行為：

- 首次進站讀取 localStorage。
- localStorage 無值時讀取 `navigator.language`。
- 不支援的語系 fallback 到 `zh-TW`。
- 切換語系後即時更新 UI，並重新查詢 Contentful Projects。

靜態字典需有 TypeScript 型別約束，避免不同語系 key 不一致。

### 5.2 Theme

支援：

- `light`
- `dark`

行為：

- 首次進站讀取 localStorage。
- localStorage 無值時讀取 `prefers-color-scheme`。
- 在 React render 前把 theme class 或 `data-theme` 套到 `document.documentElement`。
- 切換時更新 localStorage。
- 色彩 token 需對齊 `portfolio_design_system.html`。

## 6. 非功能需求

### 6.1 效能

- 首頁靜態內容不得等待 Contentful。
- Projects 區塊可非同步載入。
- 圖片需設定尺寸或 aspect ratio，避免 layout shift。
- 避免大型動畫庫；互動效果優先用 CSS transition。

### 6.2 可及性

- 所有 button 必須有明確文字或 `aria-label`。
- 外部連結需可鍵盤 focus。
- Gallery controls 可用鍵盤操作。
- 深淺色主題需維持足夠對比度。

### 6.3 型別安全

- 禁止使用 `any`。
- 若需要處理未知 CMS response，使用 `unknown` 加 type guard 或 mapper。
- Config、dictionary、Project mapper 都需保有明確 TypeScript type。

### 6.4 SEO

- `index.html` 設定合理 title、description。
- Project detail page 需在 client side 更新 document title。
- 首頁需有語意化 section heading。

## 7. 驗收標準

首頁：

- Hero、About、Skills、Experience、Projects、Contact、Footer 都可見。
- Header navigation 可跳到對應區塊。
- Projects API 成功時顯示 Contentful 資料。
- Projects API 失敗或環境變數缺失時顯示 fallback data。

專案詳情：

- `/project/:id` 可顯示對應專案。
- 不存在的 id 有明確 Not Found 或返回首頁。
- Gallery 可切換圖片。
- `demoUrl` 缺失時不顯示 Live Demo 按鈕。

i18n：

- `zh-TW` 與 `en` 可切換。
- 切換後靜態文案即時更新。
- Projects 重新以對應 Contentful locale 查詢。

Theme：

- 深淺色可切換。
- 重新整理後保留上次選擇。
- 初次載入無明顯白色閃爍。

品質：

- `npm.cmd run build` 成功。
- `npm.cmd run lint` 成功或只留下已知、文件化的非阻塞問題。
- Mobile 與 desktop 版面沒有文字重疊、破圖或橫向 overflow。

## 8. 實作順序

1. 建立 theme tokens、global layout 與設計系統基礎樣式。
2. 建立 typed static config：profile、skills、experience、i18n dictionary。
3. 加入 React Router 與基礎路由。
4. 完成首頁靜態區塊：Hero、About、Skills、Experience、Contact、Footer。
5. 建立 Contentful client、mapper、fallback projects 與 TanStack Query hooks。
6. 完成 Projects 列表與 Project Detail。
7. 加入 i18n 與 theme persistence。
8. 補齊 loading、error、empty、not found 狀態。
9. 執行 build/lint 與 mobile/desktop 視覺檢查。

## 9. 待補資料

以下資料若未提供，可先用清楚標記的 fallback，但正式上線前必須補齊：

- 真實姓名或網站品牌名稱。
- Email。
- GitHub URL。
- 履歷 URL。
- 個人照片或主視覺資產。
- Infolight 在職時間。
- 至少 2 至 3 個精選專案。
- 每個專案的截圖、GitHub URL、demo URL。
- Contentful Space ID、Access Token、Content Type ID 與 locale 設定。
