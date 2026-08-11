import { useState, useEffect, useRef, useCallback } from 'react'
import './BeforeAfter.css'

import img1Before from '../assets/1before.jpg'
import img1After from '../assets/1after.jpg'
import img2Before from '../assets/2before.jpg'
import img2After from '../assets/2after.jpg'
import img3Before from '../assets/3before.jpg'
import img3After from '../assets/3after.jpg'
import img5Before from '../assets/5before.jpg'
import img5After from '../assets/5after.jpg'

const results = [
  { id: 0, label: 'Hair Restoration', tag: 'FUE Hair Transplant', before: img1Before, after: img1After },
  { id: 1, label: 'Dental Smile', tag: 'Hollywood Veneers', before: img2Before, after: img2After },
  { id: 2, label: 'Skin Rejuvenation', tag: 'Facelift Surgery', before: img3Before, after: img3After },
  { id: 3, label: 'Hair Density', tag: 'DHI Technique', before: img5Before, after: img5After },
]

const TOTAL = results.length
const AUTO_INTERVAL = 4000

export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)
  const dragStart = useRef(null)
  const isAnimating = useRef(false)

  const goTo = useCallback((index) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setActive(index)
    setTimeout(() => { isAnimating.current = false }, 700)
  }, [])

  const next = useCallback(() => goTo((active + 1) % TOTAL), [active, goTo])
  const prev = useCallback(() => goTo((active - 1 + TOTAL) % TOTAL), [active, goTo])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, AUTO_INTERVAL)
  }, [next])

  useEffect(() => {
    timerRef.current = setInterval(next, AUTO_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next])

  const handlePrev = () => { resetTimer(); prev() }
  const handleNext = () => { resetTimer(); next() }

  const onPointerDown = (e) => { dragStart.current = e.clientX ?? e.touches?.[0]?.clientX }
  const onPointerUp = (e) => {
    if (dragStart.current === null) return
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX
    const diff = dragStart.current - end
    if (Math.abs(diff) > 50) { resetTimer(); diff > 0 ? next() : prev() }
    dragStart.current = null
  }

  const getPos = (id) => {
    const diff = (id - active + TOTAL) % TOTAL
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === TOTAL - 1) return 'left'
    return 'hidden'
  }

  return (
    <section className="ba" id="results">
      <div className="ba__container container">

        <div className="ba__header" data-animate="fade-up">
          <span className="section-label">Real Results</span>
          <h2 className="section-title">See the Transformation</h2>
          <p className="section-subtitle">
            Real before &amp; after results from our patients - authentic transformations.
          </p>
        </div>

        <div
          className="ba__stage"
          onMouseDown={onPointerDown}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
        >
          {results.map((item) => {
            const pos = getPos(item.id)
            return (
              <div
                key={item.id}
                className={`ba__card ba__card--${pos}`}
                onClick={() => pos !== 'center' && (resetTimer(), goTo(item.id))}
              >
                <div className="ba__split">
                  <div className="ba__half ba__half--before">
                    <img src={item.before} alt="Before" draggable={false} />
                    <span className="ba__tag ba__tag--before">Before</span>
                  </div>

                  <div className="ba__center-line">
                    <div className="ba__center-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>

                  <div className="ba__half ba__half--after">
                    <img src={item.after} alt="After" draggable={false} />
                    <span className="ba__tag ba__tag--after">After</span>
                  </div>
                </div>

                {pos === 'center' && (
                  <div className="ba__card-footer">
                    <span className="ba__card-treatment">{item.tag}</span>
                    <span className="ba__card-label">{item.label}</span>
                  </div>
                )}

                {pos !== 'center' && <div className="ba__card-vignette" />}
              </div>
            )
          })}

          <button className="ba__arrow ba__arrow--prev" onClick={handlePrev} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="ba__arrow ba__arrow--next" onClick={handleNext} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="ba__dots">
          {results.map((item) => (
            <button
              key={item.id}
              className={`ba__dot${item.id === active ? ' ba__dot--active' : ''}`}
              onClick={() => { resetTimer(); goTo(item.id) }}
              aria-label={`Go to slide ${item.id + 1}`}
            />
          ))}
        </div>

        <div className="ba__progress-track">
          <div className="ba__progress-bar" key={active} />
        </div>

      </div>
    </section>
  )
}
