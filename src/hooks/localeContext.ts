import { createContext } from 'react'
import { translations, type Locale } from '../config/i18n'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
