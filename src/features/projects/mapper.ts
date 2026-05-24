import type { Entry, EntrySkeletonType } from 'contentful'
import type { Project, ProjectImage } from './types'

interface ProjectFields {
  id?: unknown
  title?: unknown
  category?: unknown
  images?: unknown
  techTags?: unknown
  summary?: unknown
  challenge?: unknown
  solution?: unknown
  features?: unknown
  role?: unknown
  outcome?: unknown
  githubUrl?: unknown
  demoUrl?: unknown
  order?: unknown
}

type ContentfulProjectEntry = Entry<EntrySkeletonType<ProjectFields>>

function asString(value: unknown): string | null {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  const richText = richTextToPlainText(value)
  return richText.length > 0 ? richText : null
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map(asString)
      .filter((item): item is string => Boolean(item))
  }

  const stringValue = asString(value)
  if (!stringValue) {
    return []
  }

  return stringValue
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getLocalizedValue(value: unknown): unknown {
  if (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'url' in value === false &&
    'fields' in value === false &&
    'nodeType' in value === false
  ) {
    const entries = Object.values(value)
    return entries.length === 1 ? entries[0] : value
  }

  return value
}

function richTextToPlainText(value: unknown): string {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('nodeType' in value)
  ) {
    return ''
  }

  if ('value' in value && typeof value.value === 'string') {
    return value.value
  }

  if ('content' in value && Array.isArray(value.content)) {
    return value.content
      .map(richTextToPlainText)
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  return ''
}

function getFileUrl(file: unknown): string | null {
  const resolvedFile = getLocalizedValue(file)
  if (
    typeof resolvedFile === 'object' &&
    resolvedFile !== null &&
    'url' in resolvedFile &&
    typeof resolvedFile.url === 'string'
  ) {
    return resolvedFile.url.startsWith('//')
      ? `https:${resolvedFile.url}`
      : resolvedFile.url
  }

  return null
}

function getAssetTextField(asset: unknown, fieldName: 'title' | 'description'): string | undefined {
  const resolvedAsset = getLocalizedValue(asset)

  if (
    typeof resolvedAsset === 'object' &&
    resolvedAsset !== null &&
    'fields' in resolvedAsset &&
    typeof resolvedAsset.fields === 'object' &&
    resolvedAsset.fields !== null &&
    fieldName in resolvedAsset.fields
  ) {
    const fields = resolvedAsset.fields as Record<string, unknown>
    return asString(fields[fieldName]) ?? undefined
  }

  return undefined
}

function getAssetImage(asset: unknown): ProjectImage | null {
  const resolvedAsset = getLocalizedValue(asset)

  if (
    typeof resolvedAsset === 'object' &&
    resolvedAsset !== null &&
    'fields' in resolvedAsset &&
    typeof resolvedAsset.fields === 'object' &&
    resolvedAsset.fields !== null &&
    'file' in resolvedAsset.fields
  ) {
    const url = getFileUrl(resolvedAsset.fields.file)
    if (!url) {
      return null
    }

    return {
      url,
      title: getAssetTextField(resolvedAsset, 'title'),
      description: getAssetTextField(resolvedAsset, 'description'),
    }
  }

  return null
}

function asImages(value: unknown): ProjectImage[] {
  const resolvedValue = getLocalizedValue(value)
  const assets = Array.isArray(resolvedValue) ? resolvedValue : [resolvedValue]

  return assets
    .map(getAssetImage)
    .filter((image): image is ProjectImage => Boolean(image))
}

export function mapContentfulProject(entry: ContentfulProjectEntry): Project | null {
  const fields = entry.fields as ProjectFields
  const id = asString(fields.id)
  const title = asString(fields.title)
  const category = asString(fields.category)
  const summary = asString(fields.summary)
  const challenge = asString(fields.challenge)
  const solution = asString(fields.solution)
  const githubUrl = asString(fields.githubUrl)

  if (!id || !title || !category || !summary || !challenge || !solution || !githubUrl) {
    if (import.meta.env.DEV) {
      console.warn('Skipping invalid Contentful project entry', entry.sys.id)
    }

    return null
  }

  return {
    id,
    title,
    category,
    images: asImages(fields.images),
    techTags: asStringArray(fields.techTags),
    summary,
    challenge,
    solution,
    features: asStringArray(fields.features),
    role: asString(fields.role) ?? undefined,
    outcome: asString(fields.outcome) ?? undefined,
    githubUrl,
    demoUrl: asString(fields.demoUrl) ?? undefined,
  }
}
