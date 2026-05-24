import { profile } from '../../config/profile'
import { useLocale } from '../../hooks/useLocale'

export function SiteFooter() {
  const { t } = useLocale()

  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <span>{t.footer.built}</span>
        <span>
          {profile.englishName} / {profile.role}
        </span>
      </div>
    </footer>
  )
}
