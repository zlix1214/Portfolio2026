import { type ReactNode, useMemo, useState } from 'react'
import { translations, type Locale } from '../config/i18n'
import { LocaleContext, type LocaleContextValue } from './localeContext'

const storageKey = 'portfolio-locale'

function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) {
    return null
  }

  const normalized = value.toLowerCase()
  if (normalized.startsWith('zh')) {
    return 'zh-TW'
  }

  if (normalized.startsWith('en')) {
    return 'en'
  }

  return null
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh-TW'
  }

  return (
    normalizeLocale(window.localStorage.getItem(storageKey)) ??
    normalizeLocale(window.navigator.language) ??
    'zh-TW'
  )
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const value = useMemo<LocaleContextValue>(() => {
    const setLocale = (nextLocale: Locale) => {
      window.localStorage.setItem(storageKey, nextLocale)
      setLocaleState(nextLocale)
    }

    return {
      locale,
      setLocale,
      t: translations[locale],
    }
  }, [locale])

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}
