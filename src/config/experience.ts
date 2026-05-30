export interface ExperienceItem {
  company: string
  role: string
  timeRange: string
  highlights: string[]
}

export const experienceByLocale = {
  'zh-TW': [
    {
      company: '訊光科技系統有限公司 Infolight',
      role: '軟體工程師',
      timeRange: '2026.03 -',
      highlights: [
        '熟悉 EEPCore 開發框架，運用組件化工具快速建構 CRUD 基礎介面',
        '參與資料表結構（Table Schema）設計，並學習維護後端預存程序（Stored Procedures）以處理基礎邏輯',
        '在資深工程師指導下，運用 C# 撰寫 Server Component，實作企業流程簽核邏輯',
        '結合 jQuery 與 Bootstrap 進行響應式介面優化，確保企業端軟體的使用者體驗',
      ],
    },
    {
      company: '安聯人壽保險股份有限公司',
      role: 'MIS 工程師助理 (Intern)',
      timeRange: '2025.03 - 2026.09',
      highlights: [
        '負責 IT 技術支援，協助員工處理 Citrix、O365、SFTP 等系統問題',
        '透過遠端操作解決軟體與網路連線問題，提升 IT 支援效率',
        '記錄與分析技術問題，並協助內部 IT 團隊優化技術支援流程',
        '具備 Log 排查經驗，協助分析使用者連線錯誤並提出解決方案',
      ],
    },
  ],
  en: [
    {
      company: 'Infolight Co., Ltd.',
      role: 'Software Engineer',
      timeRange: '2026.03 -',
      highlights: [
        'Worked with the EEPCore development framework and used component-based tools to quickly build CRUD interfaces',
        'Participated in table schema design and learned to maintain backend stored procedures for core business logic',
        'Implemented enterprise workflow approval logic with C# Server Components under senior engineer guidance',
        'Improved responsive enterprise UI experiences with jQuery and Bootstrap',
      ],
    },
    {
      company: 'Allianz Taiwan Life Insurance Co., Ltd.',
      role: 'MIS Engineer Assistant Intern',
      timeRange: '2025.03 - 2026.09',
      highlights: [
        'Provided IT support for internal users across Citrix, O365, SFTP, and related systems',
        'Resolved software and network issues through remote support, improving IT support efficiency',
        'Documented and analyzed technical issues to help the internal IT team improve support workflows',
        'Investigated logs and assisted in diagnosing user connection errors with practical solutions',
      ],
    },
  ],
} satisfies Record<'zh-TW' | 'en', ExperienceItem[]>
