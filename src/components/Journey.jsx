import { useState, useRef, useCallback, useEffect } from 'react'
import './Journey.css'

const steps = [
  {
    id: 0,
    icon: '✈️',
    step: '01',
    title: 'Arrival',
    subtitle: 'We handle your transfer',
    desc: 'Land in Istanbul and relax - our professional team picks you up directly from the airport in a luxury vehicle. No stress, no hassle.',
    video: '/transport.mp4',
    tag: 'Free Transfer Included',
  },
  {
    id: 1,
    icon: '🏨',
    step: '02',
    title: 'Your Stay',
    subtitle: 'Luxury hotel, fully arranged',
    desc: 'We accommodate you in a premium hotel in Istanbul. Rest, recover, and explore the city while we take care of every detail.',
    video: '/StayHotel.mp4',
    tag: 'Hotel Arranged',
  },
  {
    id: 2,
    icon: '💉',
    step: '03',
    title: 'Treatment',
    subtitle: 'World-class procedures',
    desc: 'Performed by board-certified surgeons using cutting-edge technology. Hair transplants, dental care, and cosmetic surgeries tailored to your goals.',
    video: '/cosmeticSurgery2.mp4',
    tag: 'Expert Surgeons',
  },
  {
    id: 3,
    icon: '😁',
    step: '04',
    title: 'Transformation',
    subtitle: 'See your new self',
    desc: 'Walk out with visible, life-changing results. Our aftercare team guides you every step of the way - even after you return home.',
    video: '/cosmeticSurgery3.mp4',
    tag: 'Lifetime Aftercare',
  },
]

const TOTAL = steps.length

export default function Journey() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [showUnmuteHint, setShowUnmuteHint] = useState(true)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          // Reset to Arrival (step 0) when section enters viewport
          setActive(0)
          setIsTransitioning(false)
        }
      })
    }, { threshold: 0.3 }) // Trigger when 30% visible

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current) // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, [])

  // Handle play/pause safely when video is loaded or view state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay prevented, try muted
            videoRef.current.muted = true
            setIsMuted(true)
            videoRef.current.play().catch(e => console.log('Autoplay blocked completely', e))
          })
        }
      } else {
        videoRef.current.pause()
      }
    }
  }, [active, isInView])

  const goTo = useCallback((index) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setActive(index)
    setTimeout(() => { setIsTransitioning(false) }, 700)
  }, [active, isTransitioning])

  const next = useCallback(() => {
    const nextIdx = (active + 1) % TOTAL
    setIsTransitioning(true)
    setActive(nextIdx)
    setTimeout(() => { setIsTransitioning(false) }, 700)
  }, [active])

  const handleStep = (i) => { goTo(i) }

  const handleVideoEnd = () => { next() }

  const toggleMute = () => {
    setIsMuted(m => {
      const next = !m
      if (videoRef.current) videoRef.current.muted = next
      return next
    })
  }

  const progress = ((active + 1) / steps.length) * 100

  return (
    <section className="journey" id="journey" ref={sectionRef}>
      {/* Ambient orbs */}
      <div className="journey__orb journey__orb--1" />
      <div className="journey__orb journey__orb--2" />

      <div className="journey__container container">

        {/* Header */}
        <div className="journey__header" data-animate="fade-up">
          <span className="section-label">The IQS Experience</span>
          <h2 className="section-title">Your Complete Journey</h2>
          <p className="section-subtitle">
            From the moment you land to your final transformation - we handle everything.
          </p>
        </div>

        {/* Main layout */}
        <div className="journey__body">

          {/* Left - Step Selector + Description */}
          <div className="journey__steps">
            {steps.map((s, i) => (
              <button
                key={s.id}
                className={`journey__step${i === active ? ' journey__step--active' : ''}`}
                onClick={() => handleStep(i)}
              >
                <div className="journey__step-num">{s.step}</div>
                <div className="journey__step-info">
                  <span className="journey__step-icon">{s.icon}</span>
                  <div>
                    <p className="journey__step-title">{s.title}</p>
                    <p className="journey__step-sub">{s.subtitle}</p>
                  </div>
                </div>
                {i === active && (
                  <div className="journey__step-progress">
                    <div className="journey__step-progress-bar" key={active} />
                  </div>
                )}
              </button>
            ))}

            {/* Overall progress */}
            <div className="journey__overall-progress">
              <div className="journey__overall-track">
                <div className="journey__overall-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="journey__overall-label">Step {active + 1} of {steps.length}</span>
            </div>

            {/* Description card - moved here so heights align with video */}
            <div className="journey__desc-card" key={active}>
              <h3 className="journey__desc-title">{steps[active].title}</h3>
              <p className="journey__desc-text">{steps[active].desc}</p>
              <a href="#booking" className="journey__desc-cta">
                Start My Journey
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right - Video only */}
          <div className="journey__visual">

            {/* Video stage */}
            <div className="journey__video-stage">
              {/* Tap to Unmute Overlay */}
              {isMuted && showUnmuteHint && (
                <div 
                  className="journey__unmute-overlay"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                    setShowUnmuteHint(false);
                  }}
                >
                  <div className="journey__unmute-pulse">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                    Tap to Unmute
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                key={active}
                src={steps[active].video}
                autoPlay
                playsInline
                muted={isMuted}
                onCanPlay={(e) => { e.target.muted = isMuted }}
                onEnded={handleVideoEnd}
                onClick={() => { toggleMute(); setShowUnmuteHint(false); }}
                style={{ cursor: 'pointer' }}
                className={`journey__video journey__video--in`}
              />

              {/* Tag badge */}
              <div className="journey__video-tag">
                <span className="journey__tag-dot" />
                {steps[active].tag}
              </div>

              {/* Step indicator overlay */}
              <div className="journey__video-step-badge">
                {steps[active].icon} {steps[active].title}
              </div>

              {/* Mute/Unmute button */}
              <button
                className={`journey__mute-btn${isMuted ? ' journey__mute-btn--muted' : ''}`}
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>

              {/* Navigation arrows */}
              <button
                className="journey__nav journey__nav--prev"
                onClick={() => handleStep((active - 1 + steps.length) % steps.length)}
                aria-label="Previous step"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="journey__nav journey__nav--next"
                onClick={() => handleStep((active + 1) % steps.length)}
                aria-label="Next step"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dots */}
        <div className="journey__dots">
          {steps.map((s, i) => (
            <button
              key={s.id}
              className={`journey__dot${i === active ? ' journey__dot--active' : ''}`}
              onClick={() => handleStep(i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
