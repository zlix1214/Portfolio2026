export interface Skill {
  name: string
  category: 'Frontend' | 'Backend & DB' | 'Tools'
  icon: string
  accent?: boolean
}

export const skills: Skill[] = [
  { category: 'Frontend', name: 'React', icon: 'react', accent: true },
  { category: 'Frontend', name: 'JavaScript ES6+', icon: 'javascript' },
  { category: 'Frontend', name: 'TypeScript', icon: 'typescript', accent: true },
  { category: 'Frontend', name: 'TanStack Query', icon: 'tanstack' },
  { category: 'Frontend', name: 'Tailwind CSS', icon: 'tailwind' },
  { category: 'Backend & DB', name: 'C#', icon: 'csharp', accent: true },
  { category: 'Backend & DB', name: 'ASP.NET Core WebAPI', icon: 'dotnet' },
  { category: 'Backend & DB', name: 'Entity Framework Core', icon: 'ef' },
  { category: 'Backend & DB', name: 'Express', icon: 'express' },
  { category: 'Backend & DB', name: 'SQL Server', icon: 'sqlserver' },
  { category: 'Backend & DB', name: 'MongoDB', icon: 'mongodb' },
  { category: 'Tools', name: 'Git', icon: 'git' },
  { category: 'Tools', name: 'GitHub', icon: 'github' },
  { category: 'Tools', name: 'Vercel', icon: 'vercel' },
  { category: 'Tools', name: 'Render', icon: 'render' },
  { category: 'Tools', name: 'GitHub Copilot', icon: 'copilot', accent: true },
]
