import type { IconType } from 'react-icons'
import {
  SiDotnet,
  SiExpress,
  SiGithub,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiReact,
  SiRender,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { VscGithubInverted } from 'react-icons/vsc'

const iconMap: Record<string, IconType> = {
  csharp: SiSharp,
  dotnet: SiDotnet,
  express: SiExpress,
  git: SiGit,
  github: SiGithub,
  javascript: SiJavascript,
  mongodb: SiMongodb,
  react: SiReact,
  render: SiRender,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  vercel: SiVercel,
  copilot: VscGithubInverted,
}

const fallbackLabels: Record<string, string> = {
  ef: 'EF',
  sqlserver: 'SQL',
  tanstack: 'TQ',
}

interface SkillIconProps {
  icon: string
  name: string
}

export function SkillIcon({ icon, name }: SkillIconProps) {
  const Icon = iconMap[icon]

  if (Icon) {
    return <Icon aria-hidden="true" />
  }

  return (
    <span className="skill-icon__fallback" aria-hidden="true">
      {fallbackLabels[icon] ?? name.slice(0, 2)}
    </span>
  )
}
