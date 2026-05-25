import { SectionHeading } from '../ui/SectionHeading'
import { RevealedSection } from '../ui/RevealedSection'
import { useLocale } from '../../hooks/useLocale'
import aboutImage from '../../assets/felixProfile.png'

export function AboutSection() {
  const { t } = useLocale()
  const focusItems = ['Frontend', 'Backend API', 'Data Flow', 'Deployment']

  return (
    <RevealedSection className="about-section" id="about">
      <SectionHeading label={t.about.label} title="Profile" />
      <div className="about-grid">
        <div className="portrait-frame">
          <img src={aboutImage} alt="Felix Zheng portrait" />
          {/* <div className="portrait-frame__label">SYSTEM / LEARNING / REFACTOR</div>
          <div className="portrait-frame__center">Felix</div> */}
        </div>
        <div className="about-copy">
          <div className="about-profile-grid">
            <div>
             
              <strong>Build / Trace</strong>
            </div>
            <div>
            
              <strong>( ´ ▽ ` )ﾉ</strong>
            </div>
            <div>
              
              <strong>React / .NET</strong>
            </div>
          </div>
          <p>{t.about.body}</p>
          <div className="tag-row" aria-label="Focus areas">
            {focusItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="note-card">
            <span>{t.about.cardTitle}</span>
            <p>{t.about.cardBody}</p>
          </div>
        </div>
      </div>
    </RevealedSection>
  )
}
