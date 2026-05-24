import { AboutSection } from './AboutSection'
import { ContactSection } from './ContactSection'
import { ExperienceSection } from './ExperienceSection'
import { HeroSection } from './HeroSection'
import { ProjectsSection } from '../../features/projects/ProjectsSection'
import { SkillsSection } from './SkillsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="page">
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  )
}
