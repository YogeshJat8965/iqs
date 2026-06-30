import { useEffect, useRef, useState } from 'react'
import { FaAward, FaSmile, FaHospital } from 'react-icons/fa'
import './About.css'

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const start = 0
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * (end - start) + start))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="about__stat-number">
      {count}{suffix}
    </span>
  )
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__container container">
        <div className="about__image-col" data-animate="fade-right">
          <div className="about__image-wrapper">
            <img
              src="/images/doctor-portrait.png"
              alt="Dr. IQRA KHALID - IQS Clinic"
              className="about__image"
              loading="lazy"
            />
            <div className="about__image-frame" />
            <div className="about__image-badge glass">
              <FaAward />
              <span>Certified Expert</span>
            </div>
          </div>
        </div>

        <div className="about__content" data-animate="fade-left">
          <span className="section-label">Meet Your Doctor</span>
          <h2 className="section-title">Dr. IQRA KHALID</h2>
          <p className="about__text">
            With years of experience in cosmetic surgery, dental care, and hair transplantation, 
            Dr. Iqra Khalid has helped hundreds of patients from around the world achieve their 
            desired transformations. At IQS Clinic in Istanbul, we combine cutting-edge medical 
            technology with personalized care to deliver exceptional results.
          </p>
          <p className="about__text">
            Our commitment to excellence extends beyond the treatment room — we provide complete 
            medical tourism support including travel arrangements, hotel accommodations, and 
            professional translator services for our international patients.
          </p>

          <div className="about__stats">
            <div className="about__stat" data-animate="fade-up" data-delay="0.1">
              <FaAward className="about__stat-icon" />
              <Counter end={10} suffix="+" />
              <span className="about__stat-label">Years Experience</span>
            </div>
            <div className="about__stat" data-animate="fade-up" data-delay="0.2">
              <FaSmile className="about__stat-icon" />
              <Counter end={500} suffix="+" />
              <span className="about__stat-label">Happy Patients</span>
            </div>
            <div className="about__stat" data-animate="fade-up" data-delay="0.3">
              <FaHospital className="about__stat-icon" />
              <Counter end={1000} suffix="+" />
              <span className="about__stat-label">Procedures Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="about__decor about__decor--1">+</div>
      <div className="about__decor about__decor--2">+</div>
      <div className="about__decor about__decor--3">●</div>
    </section>
  )
}
