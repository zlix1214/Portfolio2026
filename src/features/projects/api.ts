import { createClient } from 'contentful'
import type { Locale } from '../../config/i18n'
import { getFallbackProjects } from './fallbackProjects'
import { mapContentfulProject } from './mapper'
import type { Project } from './types'

interface ProjectsResult {
  projects: Project[]
  source: 'contentful' | 'fallback'
}

function hasContentfulConfig() {
  return Boolean(
    import.meta.env.VITE_CONTENTFUL_SPACE_ID &&
      import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  )
}

function toContentfulLocale(locale: Locale) {
  return locale === 'zh-TW' ? 'zh-Hant-TW' : 'en-US'
}

export async function fetchProjects(locale: Locale): Promise<ProjectsResult> {
  if (!hasContentfulConfig()) {
    return { projects: getFallbackProjects(locale), source: 'fallback' }
  }

  try {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
      environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? 'master',
    })

    const response = await client.getEntries({
      content_type: import.meta.env.VITE_CONTENTFUL_PROJECT_CONTENT_TYPE ?? 'project',
      locale: toContentfulLocale(locale),
      order: ['fields.order'],
      include: 2,
    })

    const projects = response.items
      .map(mapContentfulProject)
      .filter((project): project is Project => Boolean(project))

    return {
      projects: projects.length > 0 ? projects : getFallbackProjects(locale),
      source: projects.length > 0 ? 'contentful' : 'fallback',
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Contentful project fetch failed, using fallback data', error)
    }

    return { projects: getFallbackProjects(locale), source: 'fallback' }
  }
}
