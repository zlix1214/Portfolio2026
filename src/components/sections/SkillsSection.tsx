import { skills } from '../../config/skills'
import { useLocale } from '../../hooks/useLocale'
import { RevealedSection } from '../ui/RevealedSection'
import { SectionHeading } from '../ui/SectionHeading'
import { SkillIcon } from '../ui/SkillIcon'

export function SkillsSection() {
  const { t } = useLocale()
  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

  return (
    <RevealedSection id="skills">
      <SectionHeading
        label={t.skills.label}
        title={t.skills.title}
      />
      <div className="skill-groups">
        {categories.map((category) => (
          <div className="skill-group" key={category}>
            <h3>{category}</h3>
            <div className="skill-list">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <article
                    className={skill.accent ? 'skill-tile is-accent' : 'skill-tile'}
                    key={skill.name}
                  >
                    <div className="skill-icon">
                      <SkillIcon icon={skill.icon} name={skill.name} />
                    </div>
                    <span>{skill.name}</span>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </RevealedSection>
  )
}
