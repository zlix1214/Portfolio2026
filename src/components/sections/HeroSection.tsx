import { useRef } from 'react'
import { profile } from '../../config/profile'
import { useLocale } from '../../hooks/useLocale'

export function HeroSection() {
  const { t } = useLocale()
  const panelRef = useRef<HTMLDivElement>(null)
  const metrics = [t.hero.metricOne, t.hero.metricTwo, t.hero.metricThree]

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const panel = panelRef.current
    if (!panel) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 16
    panel.style.setProperty('--tilt-x', `${x.toFixed(2)}px`)
    panel.style.setProperty('--tilt-y', `${y.toFixed(2)}px`)
  }

  function resetPointer() {
    const panel = panelRef.current
    if (!panel) {
      return
    }

    panel.style.setProperty('--tilt-x', '0px')
    panel.style.setProperty('--tilt-y', '0px')
  }

  return (
    <section
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="page hero-grid">
        <div className="hero-copy">
         
          <h1>{t.hero.title}</h1>
          <p>{t.hero.lead}</p>
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
          ref={panelRef}
        >
          <div className="hero-panel__index">FELIX's PORTFOLIO / 2026</div>
          <div className="hero-panel__mark">FELIX</div>
          <div className="hero-panel__grid">
            {metrics.map((metric) => (
              <div key={metric}>
                <strong>{metric}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
