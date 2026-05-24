import { useState } from 'react'
import { profile } from '../../config/profile'
import { useLocale } from '../../hooks/useLocale'
import { RevealedSection } from '../ui/RevealedSection'
import { SectionHeading } from '../ui/SectionHeading'

export function ContactSection() {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <RevealedSection className="contact-section" id="contact">
      <SectionHeading
        label={t.contact.label}
        title={t.contact.title}
        body={t.contact.body}
      />
      <div className="contact-panel">
        <a href={`mailto:${profile.email}`} className="contact-email">
          {profile.email}
        </a>
        <div className="button-row">
          <button className="btn accent" type="button" onClick={copyEmail}>
            {t.contact.copy}
          </button>
          <a
            className="btn secondary"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t.contact.github}
          </a>
        </div>
        {copied ? <div className="toast">{t.contact.copied}</div> : null}
      </div>
    </RevealedSection>
  )
}
