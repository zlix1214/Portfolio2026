import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    let frame = 0

    const updateActiveSection = () => {
      const isNearPageEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8

      if (isNearPageEnd) {
        setActiveSection(sectionIds[sectionIds.length - 1] ?? '')
        return
      }

      const anchorY = window.scrollY + window.innerHeight * 0.35
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node))

      let current = sections[0]?.id ?? sectionIds[0] ?? ''

      for (const section of sections) {
        if (section.offsetTop <= anchorY) {
          current = section.id
        } else {
          break
        }
      }

      setActiveSection(current)
    }

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [sectionIds])

  return activeSection
}
