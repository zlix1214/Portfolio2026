import { SectionHeading } from '../ui/SectionHeading'
import { RevealedSection } from '../ui/RevealedSection'
import { useLocale } from '../../hooks/useLocale'
import aboutImage from '../../assets/about.jpg'

export function AboutSection() {
  const { t } = useLocale()

  return (
    <RevealedSection className="about-section" id="about">
      <SectionHeading label={t.about.label} title={t.about.title} />
      <div className="about-grid">
        <div className="portrait-frame">
          <img src={aboutImage} alt="Felix Zheng portrait" />
          {/* <div className="portrait-frame__label">SYSTEM / LEARNING / REFACTOR</div>
          <div className="portrait-frame__center">Felix</div> */}
        </div>
        <div className="about-copy">
          <blockquote>{t.about.quote}</blockquote>
          <p>{t.about.body}</p>
          <div className="note-card">
            <span>{t.about.cardTitle}</span>
            <p>{t.about.cardBody}</p>
          </div>
        </div>
      </div>
    </RevealedSection>
  )
}
