import type { Project } from './types'
import type { Locale } from '../../config/i18n'

const fallbackProjectsZh: Project[] = [
  {
    id: 'car-rental-project',
    title: 'ShiftLab 租車網站',
    category: 'MERN 前端重構 / TypeScript 架構化',
    images: [],
    techTags: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'TanStack Query'],
    summary:
      '以租車瀏覽、車款資訊與預約流程為核心的 MERN 作品，重構重點放在前端資料流、型別安全與可維護的查詢狀態管理。',
    challenge:
      '原始版本以原生 React 與 JavaScript 實作，隨著畫面與資料互動增加，元件狀態、API 請求與資料型別開始分散，維護成本逐步提高。',
    solution:
      '將前端逐步改寫為 TypeScript，並導入 TanStack Query 管理伺服器狀態、快取與載入流程；同時整理資料型別與查詢邊界，讓 UI 元件更專注於呈現與互動。',
    features: ['車款瀏覽與搜尋', '使用者租車流程', '車主車輛刊登', '預約狀態管理'],
    role: '負責前端重構、資料流整理、TypeScript 型別設計與 TanStack Query 導入。',
    outcome: '降低元件內部狀態與 API 請求耦合，讓後續擴充租車流程與資料同步更容易維護。',
    githubUrl: 'https://github.com/zlix1214/CarRental',
    demoUrl: 'https://car-rental-lemon-one.vercel.app/',
  },
  {
    id: 'construction-report-system',
    title: '施工通報系統',
    category: 'ASP.NET Core / Enterprise Workflow',
    images: [],
    techTags: ['ASP.NET Core', 'Entity Framework Core', 'C#', 'SQL Server', 'REST API'],
    summary:
      '以施工現場通報流程為情境的後端系統，聚焦通報資料建模、狀態流轉與資料庫存取設計。',
    challenge:
      '施工通報通常需要保存案件內容、處理進度、責任單位與時間紀錄；若資料模型與流程邊界不清楚，後續查詢與維護會變得困難。',
    solution:
      '使用 ASP.NET Core 建立 API 邊界，搭配 Entity Framework Core 管理資料存取與關聯模型，讓通報建立、查詢與狀態更新維持清楚的後端分層。',
    features: ['施工通報建立', 'Excel 批量資料匯入', '施工狀態追蹤', '角色導向管理畫面'],
    role: '規劃後端 API、資料模型與 EF Core 關聯設計，並整理通報流程的狀態邊界。',
    outcome: '建立可查詢、可追蹤且具備流程語意的通報資料結構，降低人工整理施工進度的成本。',
    githubUrl: 'https://github.com/zlix1214',
  },
]

const fallbackProjectsEn: Project[] = [
  {
    id: 'car-rental-project',
    title: 'ShiftLab Car Rental Website',
    category: 'MERN Refactor / TypeScript Architecture',
    images: [],
    techTags: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'TanStack Query'],
    summary:
      'A MERN car rental project centered on vehicle browsing, rental flow, and frontend maintainability through typed data flow.',
    challenge:
      'The original version used React and JavaScript. As data interactions grew, component state, API requests, and implicit data shapes became harder to maintain.',
    solution:
      'Refactored the frontend with TypeScript and introduced TanStack Query for server state, caching, loading states, and cleaner query boundaries.',
    features: ['Vehicle browsing and search', 'Rental flow', 'Host vehicle listings', 'Booking status management'],
    role: 'Owned frontend refactoring, data-flow cleanup, TypeScript modeling, and TanStack Query adoption.',
    outcome: 'Reduced coupling between component state and API requests, making the rental flow easier to extend and maintain.',
    githubUrl: 'https://github.com/zlix1214/CarRental',
    demoUrl: 'https://car-rental-lemon-one.vercel.app/',
  },
  {
    id: 'construction-report-system',
    title: 'Construction Report System',
    category: 'ASP.NET Core / Enterprise Workflow',
    images: [],
    techTags: ['ASP.NET Core', 'Entity Framework Core', 'C#', 'SQL Server', 'REST API'],
    summary:
      'A backend-oriented workflow system for construction reporting, focused on report data modeling, status updates, and database access patterns.',
    challenge:
      'Construction reports need to preserve case details, progress, responsible units, and timestamps. Without clear boundaries, querying and maintenance become difficult.',
    solution:
      'Built the API boundary with ASP.NET Core and used Entity Framework Core for data access and relational modeling, keeping report creation, querying, and updates clearly separated.',
    features: ['Construction report creation', 'Excel batch import', 'Progress tracking', 'Role-oriented management views'],
    role: 'Planned backend APIs, data models, EF Core relationships, and reporting workflow boundaries.',
    outcome: 'Created a queryable and traceable reporting structure that reduces manual construction progress tracking work.',
    githubUrl: 'https://github.com/zlix1214',
  },
]

export function getFallbackProjects(locale: Locale): Project[] {
  return locale === 'en' ? fallbackProjectsEn : fallbackProjectsZh
}
