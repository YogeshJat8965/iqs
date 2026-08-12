import { useState, useRef, useEffect } from 'react'
import './Testimonials.css'

const testimonials = [
  { id: 1, img: '/testimonial1.png', video: '/testimonial1.mp4' },
  { id: 2, img: '/testimonial2.png', video: '/testimonial2.mp4' },
  { id: 3, img: '/testimonial3.png', video: '/testimonial3.mp4' },
  { id: 4, img: '/testimonial4.png', video: '/testimonial4.mp4' },
  { id: 5, img: '/testimonial5.png', video: '/testimonial5.mp4' },
  { id: 6, img: '/testimonial6.png', video: '/testimonial6.mp4' },
]

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef(null)

  const openVideo = (item) => {
    setActiveVideo(item)
    setIsMuted(false)
  }

  const closeVideo = () => {
    if (videoRef.current) videoRef.current.pause()
    setActiveVideo(null)
  }

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true
        setIsMuted(true)
        videoRef.current.play()
      })
    }
  }, [activeVideo])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeVideo() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeVideo])

  return (
    <>
      <section className="testimonials-section" id="testimonials">
        <div className="container">

          <div className="testimonials__header" data-animate="fade-up">
            <span className="section-label">Patient Stories</span>
            <h2 className="section-title">Real People. Real Results.</h2>
            <p className="section-subtitle">
              Every story here is a real patient who trusted IQS Clinic and transformed their life.
            </p>
          </div>

          <div className="testimonials__grid" data-animate="fade-up" data-delay="0.1">
            {testimonials.map((item) => (
              <img
                key={item.id}
                src={item.img}
                alt={`Patient story ${item.id}`}
                className="testimonials__img"
                loading="lazy"
                onClick={() => openVideo(item)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="testimonials__modal" onClick={closeVideo}>
          <div className="testimonials__modal-inner" onClick={(e) => e.stopPropagation()}>

            <button className="testimonials__modal-close" onClick={closeVideo} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <video
              ref={videoRef}
              src={activeVideo.video}
              className="testimonials__modal-video"
              playsInline
              muted={isMuted}
            />

            <button
              className="testimonials__mute-btn"
              aria-label="Toggle mute"
              onClick={() => {
                const next = !isMuted
                setIsMuted(next)
                if (videoRef.current) videoRef.current.muted = next
              }}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>

          </div>
        </div>
      )}
    </>
  )
}
