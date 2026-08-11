import { useState, useEffect, useRef } from 'react'
import './ReelsShowcase.css'

const tabs = ['All', 'Hair Transplant', 'Dental Treatment', 'Cosmetic Surgery', 'Clinic Experience']

const allVideos = [
  // Hair Transplant
  { id: 1, tab: 'Hair Transplant', src: '/hairTransplant.mp4', title: 'Premium FUE' },
  { id: 2, tab: 'Hair Transplant', src: '/HairTransplant.mp4', title: 'Hair Restoration' },
  { id: 3, tab: 'Hair Transplant', src: '/hairTransplant2.mp4', title: 'FUE Results' },
  { id: 4, tab: 'Hair Transplant', src: '/hairTransplant3.mp4', title: 'DHI Technique' },
  { id: 5, tab: 'Hair Transplant', src: '/hairTransplant4.mp4', title: 'Natural Hairline' },
  { id: 6, tab: 'Hair Transplant', src: '/hairTransplant5.mp4', title: 'Density Check' },
  { id: 7, tab: 'Hair Transplant', src: '/hairTransplant6.mp4', title: 'Hair Growth' },
  { id: 8, tab: 'Hair Transplant', src: '/beardTransplant.mp4', title: 'Beard Transplant' },
  // Dental
  { id: 9, tab: 'Dental Treatment', src: '/dentalService.mp4', title: 'Dental Implants' },
  { id: 10, tab: 'Dental Treatment', src: '/dentalSmile.mp4', title: 'Hollywood Smile' },
  { id: 11, tab: 'Dental Treatment', src: '/dental3.mp4', title: 'Veneers' },
  { id: 12, tab: 'Dental Treatment', src: '/dental4.mp4', title: 'Smile Design' },
  { id: 13, tab: 'Dental Treatment', src: '/dental5.mp4', title: 'Teeth Whitening' },
  { id: 14, tab: 'Dental Treatment', src: '/dental6.mp4', title: 'Dental Makeover' },
  // Cosmetic
  { id: 15, tab: 'Cosmetic Surgery', src: '/cosmeticSurgery.mp4', title: 'Aesthetic Surgery' },
  { id: 16, tab: 'Cosmetic Surgery', src: '/cosmeticSurgery2.mp4', title: 'Rhinoplasty' },
  { id: 17, tab: 'Cosmetic Surgery', src: '/cosmeticSurgery3.mp4', title: 'Body Contouring' },
  { id: 18, tab: 'Cosmetic Surgery', src: '/surgery.mp4', title: 'Facial Aesthetics' },
  { id: 19, tab: 'Cosmetic Surgery', src: '/surgery2.mp4', title: 'Liposuction' },
  { id: 20, tab: 'Cosmetic Surgery', src: '/surgery3.mp4', title: 'Mommy Makeover' },
  // Experience
  { id: 21, tab: 'Clinic Experience', src: '/StayHotel.mp4', title: 'Luxury Stay' },
  { id: 22, tab: 'Clinic Experience', src: '/transport.mp4', title: 'VIP Transfer' },
  { id: 23, tab: 'Clinic Experience', src: '/whyChoose.mp4', title: 'Patient Journey' },
  { id: 24, tab: 'Clinic Experience', src: '/heroVideo.mp4', title: 'Our Clinic' },
]

export default function ReelsShowcase() {
  const [activeTab, setActiveTab] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false) // Try unmuted by default
  const [isInView, setIsInView] = useState(false)
  const [showUnmuteHint, setShowUnmuteHint] = useState(true)
  
  const videoRefs = useRef([])
  const sectionRef = useRef(null)

  const filteredVideos = activeTab === 'All' 
    ? allVideos 
    : allVideos.filter(v => v.tab === activeTab)

  // Viewport intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          // Reset to first video whenever section enters viewport
          setActiveIndex(0)
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

  // Reset index when tab changes
  useEffect(() => {
    setActiveIndex(0)
  }, [activeTab])

  // Handle play/pause based on active index AND viewport visibility
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return
      if (idx === activeIndex && isInView) {
        const playPromise = vid.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented by browser, mute and try again
            vid.muted = true
            setIsMuted(true)
            vid.play().catch(e => console.log('Autoplay prevented completely', e))
          })
        }
      } else {
        vid.pause()
      }
    })
  }, [activeIndex, activeTab, filteredVideos.length, isInView])

  // Sync mute state safely without re-triggering play
  useEffect(() => {
    videoRefs.current.forEach(vid => {
      if (vid) {
        vid.muted = isMuted
      }
    })
  }, [isMuted])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredVideos.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length)
  }

  // Calculate 3D transforms using circular array math
  const getStyle = (index) => {
    const N = filteredVideos.length
    
    // Shortest distance in a circular array
    let diff = (index - activeIndex) % N
    if (diff > Math.floor(N / 2)) diff -= N
    if (diff < -Math.floor(N / 2)) diff += N
    
    const absDiff = Math.abs(diff)
    
    // Base styles for active item
    let translateX = 0
    let translateZ = 0
    let rotateY = 0
    let scale = 1
    let zIndex = 10
    let opacity = 1

    if (diff !== 0) {
      // Inactive items
      const direction = diff > 0 ? 1 : -1
      
      // Spread items wider across the full width screen
      translateX = direction * (130 + (absDiff - 1) * 110) // Wider spacing (130%, 240%, 350%...)
      translateZ = -180 - (absDiff * 60)
      rotateY = direction * -30 // Angle towards center
      scale = 0.9 - (absDiff * 0.12)
      zIndex = 20 - absDiff
      
      // Fade out items that are very far away (exactly 2 on each side)
      opacity = absDiff > 2 ? 0 : (1 - absDiff * 0.15)
    }

    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      pointerEvents: absDiff > 2 ? 'none' : 'auto'
    }
  }

  return (
    <section className="reels-showcase" id="gallery" ref={sectionRef}>
      <div className="container">
        
        <div className="reels__header" data-animate="fade-up">
          <span className="section-label">Real Results, Real Stories</span>
          <h2 className="section-title">Our Work in Motion</h2>
          <p className="section-subtitle">
            Explore our state-of-the-art facilities, procedures, and the beauty of Istanbul.
          </p>
        </div>

        {/* Tabs */}
        <div className="reels__tabs" data-animate="fade-up" data-delay="0.1">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`reels__tab ${activeTab === tab ? 'reels__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Full Width 3D Carousel Stage */}
      <div className="reels__carousel-wrapper">
        <div className="reels__carousel" data-animate="fade-up" data-delay="0.2">
          {filteredVideos.map((video, index) => {
            const isActive = index === activeIndex
            
            return (
              <div 
                key={`${video.id}-${activeTab}`} // Force remount on tab change for clean animation
                className={`reels__item ${isActive ? 'reels__item--active' : ''}`}
                style={getStyle(index)}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(index)
                  } else {
                    setIsMuted(!isMuted) // Toggle mute if already active
                    setShowUnmuteHint(false)
                  }
                }}
              >
                {isActive && (
                  <div className="reels__badge">{video.title}</div>
                )}

                {isActive && isMuted && showUnmuteHint && (
                  <div 
                    className="reels__unmute-overlay"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(false);
                      setShowUnmuteHint(false);
                      if (videoRefs.current[index]) {
                        videoRefs.current[index].muted = false;
                      }
                    }}
                  >
                    <div className="reels__unmute-pulse">
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
                  ref={el => videoRefs.current[index] = el}
                  src={video.src}
                  className="reels__video"
                  muted={isMuted}
                  playsInline
                  onEnded={() => {
                    if (isActive) handleNext()
                  }}
                />
                
                {/* Overlay for side items */}
                <div className="reels__overlay">
                  <div className="reels__play-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="container">
        {/* Controls */}
        <div className="reels__controls" data-animate="fade-up" data-delay="0.3">
          <button 
            className="reels__nav" 
            onClick={handlePrev}
            aria-label="Previous reel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <button 
            className={`reels__mute ${!isMuted ? 'reels__mute--unmuted' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                Unmute
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                Mute
              </>
            )}
          </button>
          
          <button 
            className="reels__nav" 
            onClick={handleNext}
            aria-label="Next reel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
