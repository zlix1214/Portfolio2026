import { Link } from 'react-router-dom'
import { useLocale } from '../../hooks/useLocale'
import { RevealedSection } from '../../components/ui/RevealedSection'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { useProjects } from './useProjects'

export function ProjectsSection() {
  const { t, locale } = useLocale()
  const { data, isLoading } = useProjects(locale)
  const projects = data?.projects ?? []

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14
    event.currentTarget.style.setProperty('--media-x', `${x.toFixed(2)}px`)
    event.currentTarget.style.setProperty('--media-y', `${y.toFixed(2)}px`)
  }

  function resetPointer(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--media-x', '0px')
    event.currentTarget.style.setProperty('--media-y', '0px')
  }

  return (
    <RevealedSection id="projects">
      <SectionHeading
        label={t.projects.label}
        title={t.projects.title}
      />
      {isLoading ? <p className="status-text">{t.projects.loading}</p> : null}
      {data?.source === 'fallback' ? (
        <p className="status-text">{t.projects.fallback}</p>
      ) : null}
      {!isLoading && projects.length === 0 ? (
        <p className="status-text">{t.projects.empty}</p>
      ) : null}
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className="project-card"
            key={project.id}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <Link
              className="project-card__media"
              to={`/project/${project.id}`}
              aria-label={`${t.projects.viewDetail}: ${project.title}`}
            >
              {project.images[0] ? (
                <img src={project.images[0].url} alt={`${project.title} preview`} />
              ) : (
                <div className="project-card__media-fallback">
                  <span>{project.title}</span>
                  <strong>Preview pending</strong>
                </div>
              )}
            </Link>
            <span className="project-card__num">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="project-card__category">{project.category}</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="tag-row">
              {project.techTags.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              {project.techTags.length > 4 ? (
                <span>+{project.techTags.length - 4}</span>
              ) : null}
            </div>
            <Link className="text-link" to={`/project/${project.id}`}>
              {t.projects.viewDetail}
            </Link>
          </article>
        ))}
      </div>
    </RevealedSection>
  )
}
