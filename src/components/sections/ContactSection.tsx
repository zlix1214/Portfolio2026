import { useState } from 'react'
import { profile } from '../../config/profile'
import { useLocale } from '../../hooks/useLocale'
import { RevealedSection } from '../ui/RevealedSection'
import { SectionHeading } from '../ui/SectionHeading'

export function ContactSection() {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)

  async function writeClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '-9999px'
    document.body.append(textarea)
    textarea.select()

    const copiedWithFallback = document.execCommand('copy')
    textarea.remove()

    if (!copiedWithFallback) {
      throw new Error('Clipboard copy failed')
    }
  }

  async function copyEmail() {
    try {
      await writeClipboard(profile.email)
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
        title="Contact"
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
          <a
            className="btn secondary"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          {copied ? <div className="toast">{t.contact.copied}</div> : null}
        </div>
      </div>
    </RevealedSection>
  )
}
