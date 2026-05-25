import { useState } from 'react'
import { useLocale } from '../../hooks/useLocale'
import type { ProjectImage } from './types'

interface ProjectGalleryProps {
  title: string
  images: ProjectImage[]
}

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const { t } = useLocale()
  const [index, setIndex] = useState(0)
  const hasImages = images.length > 0
  const currentImage = images[index]
  const [lightboxOpen, setLightboxOpen] = useState(false)

  function showPrevious() {
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  function showNext() {
    setIndex((current) => (current + 1) % images.length)
  }

  return (
    <section className="detail-gallery" aria-label={t.projects.gallery}>
      {hasImages ? (
        <button
          className="gallery-main-button"
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${title} screenshot ${index + 1}`}
        >
          <img src={currentImage.url} alt={currentImage.title ?? `${title} screenshot ${index + 1}`} />
        </button>
      ) : (
        <div className="image-fallback">
          <span>{title}</span>
          <strong>Preview pending</strong>
        </div>
      )}
      {images.length > 1 ? (
        <>
          <div className="gallery-controls">
            <button type="button" onClick={showPrevious} aria-label={t.projects.previous}>
              &lt;
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button type="button" onClick={showNext} aria-label={t.projects.next}>
              &gt;
            </button>
          </div>
          {currentImage.title || currentImage.description ? (
            <div className="gallery-caption">
              {currentImage.title ? <strong>{currentImage.title}</strong> : null}
              {currentImage.description ? <span>{currentImage.description}</span> : null}
            </div>
          ) : null}
          <div className="gallery-thumbs" aria-label="Gallery thumbnails">
            {images.map((image, imageIndex) => (
              <button
                className={imageIndex === index ? 'is-active' : ''}
                key={image.url}
                type="button"
                onClick={() => setIndex(imageIndex)}
                aria-label={`${title} screenshot ${imageIndex + 1}`}
              >
                <img src={image.url} alt="" />
              </button>
            ))}
          </div>
        </>
      ) : null}
      {lightboxOpen && currentImage ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image preview"
          >
            x
          </button>
          <img
            src={currentImage.url}
            alt={currentImage.title ?? `${title} screenshot ${index + 1}`}
          />
          {currentImage.title || currentImage.description ? (
            <p>
              <strong>{currentImage.title}</strong>
              {currentImage.description ? <span>{currentImage.description}</span> : null}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
