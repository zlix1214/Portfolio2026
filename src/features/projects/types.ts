export interface ProjectImage {
  url: string
  title?: string
  description?: string
}

export interface Project {
  id: string
  title: string
  category: string
  images: ProjectImage[]
  techTags: string[]
  summary: string
  challenge: string
  solution: string
  features?: string[]
  role?: string
  outcome?: string
  githubUrl: string
  demoUrl?: string
}
