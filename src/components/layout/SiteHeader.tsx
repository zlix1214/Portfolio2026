import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../../config/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLocale } from '../../hooks/useLocale'
import { useTheme } from '../../hooks/useTheme'

const navItems = [
  { href: '#about', key: 'about' },
  { href: '#skills', key: 'skills' },
  { href: '#experience', key: 'experience' },
  { href: '#projects', key: 'projects' },
  { href: '#contact', key: 'contact' },
] as const

export function SiteHeader() {
  const { t, locale, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const activeSection = useActiveSection(navItems.map((item) => item.key))
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="site-header__inner">
        <Link className="brand" to="/" aria-label="Go to homepage">
          {profile.name}
          <small>{profile.englishName}</small>
          <span>.</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.key} href={isHome ? item.href : `/${item.href}`}>
              <span className={activeSection === item.key ? 'is-active' : ''}>
                {t.nav[item.key]}
              </span>
            </a>
          ))}
        </nav>
        <div className="site-actions">
          <div className="locale-toggle" aria-label="Language switcher">
            <button
              className={locale === 'zh-TW' ? 'is-active' : ''}
              type="button"
              onClick={() => setLocale('zh-TW')}
            >
              中
            </button>
            <button
              className={locale === 'en' ? 'is-active' : ''}
              type="button"
              onClick={() => setLocale('en')}
            >
              EN
            </button>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            title={t.nav.theme}
          >
            {theme === 'dark' ? '☼' : '◐'}
          </button>
        </div>
      </div>
    </header>
  )
}
