import { useState } from 'react'
import './Gallery.css'

const galleryImages = [
  { src: '/images/hero-clinic.png', cat: 'Clinic', tall: true },
  { src: '/images/service-hair.png', cat: 'Procedure' },
  { src: '/images/service-dental.png', cat: 'Dental' },
  { src: '/images/service-cosmetic.png', cat: 'Cosmetic', tall: true },
  { src: '/images/gallery-clinic.png', cat: 'Operating Room' },
  { src: '/images/happy-patient.png', cat: 'Results' },
  { src: '/images/istanbul-view.png', cat: 'Istanbul', tall: true },
  { src: '/images/after-hair.png', cat: 'Results' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__container container">
        <div className="gallery__header" data-animate="fade-up">
          <span className="section-label">Visual Tour</span>
          <h2 className="section-title section-title--light">Photo Gallery</h2>
          <p className="section-subtitle section-subtitle--light">
            Explore our state-of-the-art facilities, procedures, and the beauty of Istanbul.
          </p>
        </div>

        <div className="gallery__grid">
          {galleryImages.map((img, index) => (
            <div
              className={`gallery__item ${img.tall ? 'gallery__item--tall' : ''}`}
              key={index}
              data-animate="scale"
              data-delay={`${index * 0.06}`}
              onClick={() => setLightbox(img)}
            >
              <img src={img.src} alt={img.cat} loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-cat">{img.cat}</span>
                <span className="gallery__item-zoom">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery__lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.cat} />
            <p>{lightbox.cat}</p>
          </div>
        </div>
      )}
    </section>
  )
}
