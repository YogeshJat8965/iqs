import { useState, useRef } from 'react'
import './BeforeAfter.css'

import img1Before from '../assets/1before.jpg'
import img1After from '../assets/1after.jpg'
import img2Before from '../assets/2before.jpg'
import img2After from '../assets/2after.jpg'
import img3Before from '../assets/3before.jpg'
import img3After from '../assets/3after.jpg'
// 4after is missing from assets, skipping 4 for now to avoid build errors
import img5Before from '../assets/5before.jpg'
import img5After from '../assets/5after.jpg'

const results = [
  {
    category: 'Patient 1',
    before: img1Before,
    after: img1After,
    label: 'Treatment Result',
  },
  {
    category: 'Patient 2',
    before: img2Before,
    after: img2After,
    label: 'Treatment Result',
  },
  {
    category: 'Patient 3',
    before: img3Before,
    after: img3After,
    label: 'Treatment Result',
  },
  {
    category: 'Patient 5',
    before: img5Before,
    after: img5After,
    label: 'Treatment Result',
    positionY: '10%', // Shift slightly downwards to show head properly
  },
  {
    category: 'Hair Transplant',
    before: '/images/before-hair.png',
    after: '/images/after-hair.png',
    label: 'FUE Hair Transplant — 6 Months Result',
  },
  {
    category: 'Dental',
    before: '/images/before-dental.png',
    after: '/images/after-dental.png',
    label: 'Hollywood Smile — Dental Veneers',
  },
]

function Slider({ data }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percent)
  }

  const handleMouseDown = () => { isDragging.current = true }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e) => { if (isDragging.current) handleMove(e.clientX) }
  const handleTouchMove = (e) => { handleMove(e.touches[0].clientX) }

  return (
    <div className="ba__slider-wrapper" data-animate="fade-up">
      <div
        className="ba__slider"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (full width background) */}
        <div className="ba__image ba__image--after">
          <img src={data.after} alt="After treatment" style={{ objectPosition: data.positionY ? `50% ${data.positionY}` : 'center' }} />
          <span className="ba__label ba__label--after">After</span>
        </div>

        {/* Before Image (clipped) */}
        <div
          className="ba__image ba__image--before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={data.before} alt="Before treatment" style={{ objectPosition: data.positionY ? `50% ${data.positionY}` : 'center' }} />
          <span className="ba__label ba__label--before">Before</span>
        </div>

        {/* Divider */}
        <div className="ba__divider" style={{ left: `${position}%` }}>
          <div className="ba__divider-line" />
          <div className="ba__divider-handle">
            <span>◄</span>
            <span>►</span>
          </div>
        </div>
      </div>
      <p className="ba__caption">{data.label}</p>
    </div>
  )
}

export default function BeforeAfter() {
  return (
    <section className="ba" id="results">
      <div className="ba__container container">
        <div className="ba__header" data-animate="fade-up">
          <span className="section-label">Real Results</span>
          <h2 className="section-title">See the Transformation</h2>
          <p className="section-subtitle">
            Drag the slider to see real before & after results from our patients.
          </p>
        </div>

        <div className="ba__grid">
          {results.map((result, index) => (
            <Slider key={index} data={result} />
          ))}
        </div>
      </div>
    </section>
  )
}
