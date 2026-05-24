import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { ProjectGallery } from './ProjectGallery'
import { useProjects } from './useProjects'

export function ProjectDetailPage() {
  const { id } = useParams()
  const { t, locale } = useLocale()
  const { data, isLoading } = useProjects(locale)
  const project = data?.projects.find((item) => item.id === id)

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Portfolio`
    }

    return () => {
      document.title = 'Portfolio'
    }
  }, [project])

  if (isLoading) {
    return (
      <section className="page detail-page">
        <p className="status-text">{t.projects.loading}</p>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="page not-found">
        <span className="eyebrow">Project / 404</span>
        <h1>{t.projects.notFound}</h1>
        <Link className="btn accent" to="/">
          {t.projects.backHome}
        </Link>
      </section>
    )
  }

  return (
    <article className="page detail-page">
      <Link className="text-link" to="/">
        ← {t.projects.backHome}
      </Link>
      <header className="detail-hero">
        <span className="eyebrow">{project.category}</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.techTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </header>
      <ProjectGallery title={project.title} images={project.images} />
      <div className="detail-grid">
        {project.features && project.features.length > 0 ? (
          <section className="detail-grid__wide">
            <h2>{t.projects.features}</h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {project.role ? (
          <section>
            <h2>{t.projects.role}</h2>
            <p>{project.role}</p>
          </section>
        ) : null}
        <section>
          <h2>{t.projects.challenge}</h2>
          <p>{project.challenge}</p>
        </section>
        <section>
          <h2>{t.projects.solution}</h2>
          <p>{project.solution}</p>
        </section>
        {project.outcome ? (
          <section>
            <h2>{t.projects.outcome}</h2>
            <p>{project.outcome}</p>
          </section>
        ) : null}
      </div>
      <div className="button-row detail-actions">
        <a className="btn accent" href={project.githubUrl} target="_blank" rel="noreferrer">
          {t.projects.source}
        </a>
        {project.demoUrl ? (
          <a className="btn secondary" href={project.demoUrl} target="_blank" rel="noreferrer">
            {t.projects.demo}
          </a>
        ) : null}
      </div>
    </article>
  )
}
