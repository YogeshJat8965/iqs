import { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'
import './Carousel.css'

register()

const images = [
  { src: '/images/hero-clinic.png', caption: 'Premium Clinic Interior' },
  { src: '/images/service-hair.png', caption: 'Hair Transplant Procedure' },
  { src: '/images/service-dental.png', caption: 'Dental Treatment Suite' },
  { src: '/images/service-cosmetic.png', caption: 'Cosmetic Surgery Consultation' },
  { src: '/images/gallery-clinic.png', caption: 'State-of-Art Operating Room' },
  { src: '/images/happy-patient.png', caption: 'Happy Patient Results' },
  { src: '/images/istanbul-view.png', caption: 'Beautiful Istanbul, Turkey' },
]

export default function Carousel() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiperEl = swiperRef.current
    if (!swiperEl) return

    const params = {
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      pagination: {
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1.5, spaceBetween: 24 },
        768: { slidesPerView: 2.2, spaceBetween: 28 },
        1024: { slidesPerView: 2.8, spaceBetween: 32 },
      },
    }

    Object.assign(swiperEl, params)
    swiperEl.initialize()
  }, [])

  return (
    <section className="carousel-section" id="carousel">
      <div className="carousel-section__header container" data-animate="fade-up">
        <span className="section-label">Our Clinic & Results</span>
        <h2 className="section-title">Gallery Showcase</h2>
        <p className="section-subtitle">
          Take a virtual tour of our premium facilities and see the excellence in every detail.
        </p>
      </div>

      <div className="carousel-section__slider" data-animate="fade-up" data-delay="0.2">
        <swiper-container ref={swiperRef} init="false">
          {images.map((img, index) => (
            <swiper-slide key={index}>
              <div className="carousel-section__slide">
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="carousel-section__caption">
                  <span>{img.caption}</span>
                </div>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  )
}
