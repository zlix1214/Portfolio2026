import { Link } from 'react-router-dom'
import { useLocale } from '../../hooks/useLocale'

export function NotFoundPage() {
  const { t } = useLocale()

  return (
    <section className="page not-found">
      <span className="eyebrow">404</span>
      <h1>{t.projects.notFound}</h1>
      <Link className="btn accent" to="/">
        {t.projects.backHome}
      </Link>
    </section>
  )
}
