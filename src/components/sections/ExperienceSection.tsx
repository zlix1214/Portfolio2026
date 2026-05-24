import { experienceByLocale } from '../../config/experience'
import { useLocale } from '../../hooks/useLocale'
import { RevealedSection } from '../ui/RevealedSection'
import { SectionHeading } from '../ui/SectionHeading'

export function ExperienceSection() {
  const { t, locale } = useLocale()
  const experience = experienceByLocale[locale]

  return (
    <RevealedSection id="experience">
      <SectionHeading
        label={t.experience.label}
        title={t.experience.title}
      />
      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={`${item.company}-${item.role}`}>
            <div>
              <span className="timeline-item__range">{item.timeRange}</span>
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </RevealedSection>
  )
}
