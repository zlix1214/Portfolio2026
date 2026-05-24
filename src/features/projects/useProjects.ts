import { useQuery } from '@tanstack/react-query'
import type { Locale } from '../../config/i18n'
import { fetchProjects } from './api'

export function useProjects(locale: Locale) {
  return useQuery({
    queryKey: ['projects', locale],
    queryFn: () => fetchProjects(locale),
  })
}
