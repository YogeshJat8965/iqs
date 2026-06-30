import { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import './Reviews.css'

register()

const reviewData = [
  { name: 'Sarah L.', country: 'UK', rating: 5, text: 'The hair transplant results exceeded my expectations. True professionals!' },
  { name: 'Michael T.', country: 'USA', rating: 5, text: 'World-class facilities. The staff made me feel like royalty from day one.' },
  { name: 'Elena V.', country: 'Germany', rating: 5, text: 'Dental implants were completely painless and look entirely natural.' },
  { name: 'David C.', country: 'Canada', rating: 5, text: 'From hotel to clinic, the VIP service and communication was seamless.' },
  { name: 'Aisha M.', country: 'UAE', rating: 5, text: 'I regained my confidence after my cosmetic surgery. Thank you IQS!' },
  { name: 'John D.', country: 'Australia', rating: 5, text: 'Excellent value for money without compromising on medical quality.' },
  { name: 'Sophie B.', country: 'France', rating: 5, text: 'The medical team in Istanbul is simply the best in the world.' },
  { name: 'Omar K.', country: 'Qatar', rating: 5, text: 'Flawless execution. The translator made the whole process stress-free.' },
]

export default function Reviews() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiperEl = swiperRef.current
    if (!swiperEl) return

    const params = {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 4000,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 32 },
        1280: { slidesPerView: 4, spaceBetween: 32 },
        1536: { slidesPerView: 5, spaceBetween: 32 }
      }
    }

    Object.assign(swiperEl, params)
    swiperEl.initialize()
  }, [])

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle" data-animate="fade-up">Patient Stories</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="0.1">Real Results, Real Confidence</h2>
          <p className="section-description" data-animate="fade-up" data-delay="0.2">
            Hear from our international patients who transformed their lives with IQS Clinic.
          </p>
        </div>
      </div>

      <div className="reviews__slider" data-animate="fade-up" data-delay="0.3">
        <swiper-container ref={swiperRef} init="false" class="reviews-swiper">
          {reviewData.map((review, index) => (
            <swiper-slide key={index}>
              <div className="review-card glass">
                <FaQuoteLeft className="review-icon" />
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <strong>{review.name}</strong>
                  <span>{review.country}</span>
                </div>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  )
}
