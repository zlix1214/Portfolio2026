import { profile } from '../../config/profile'
import { useLocale } from '../../hooks/useLocale'

export function HeroSection() {
  const { t } = useLocale()
  const metrics = [t.hero.metricOne, t.hero.metricTwo, t.hero.metricThree]
  const focusItems = ['ABOUT', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'CONTACT']

  return (
    <section className="hero-section">
      <div className="page hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Portfolio / 2026</div>
          <h1>{profile.englishName}</h1>
          <p>{profile.role}</p>
          <div className="button-row">
            <a className="btn accent" href="#projects">
              {t.hero.primaryCta}
            </a>
            {profile.resumeUrl ? (
              <a
                className="btn secondary"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t.hero.secondaryCta}
              </a>
            ) : null}
          </div>
        </div>
        <div
          className="hero-panel"
          aria-label="Engineering focus summary"
        >
          <div className="hero-panel__index">Profile Index</div>
          <div className="hero-panel__mark">FZ</div>
          <div className="hero-panel__grid">
            {metrics.map((metric) => (
              <div key={metric}>
                <strong>{metric}</strong>
              </div>
            ))}
            {focusItems.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
