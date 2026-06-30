import { FaCalendarAlt, FaVideo, FaPlane, FaHospital, FaStar } from 'react-icons/fa'
import './Timeline.css'

const steps = [
  { icon: <FaCalendarAlt />, title: 'Book Consultation', desc: 'Schedule a free online consultation' },
  { icon: <FaVideo />, title: 'Online Assessment', desc: 'Video call with our specialist' },
  { icon: <FaPlane />, title: 'Travel to Istanbul', desc: 'We arrange flights & hotel' },
  { icon: <FaHospital />, title: 'Procedure Day', desc: 'Treatment at our premium clinic' },
  { icon: <FaStar />, title: 'Recovery & Follow-up', desc: 'Post-care support & monitoring' },
]

export default function Timeline() {
  return (
    <section className="timeline">
      <div className="timeline__container container">
        <div className="timeline__header" data-animate="fade-up">
          <span className="section-label">Your Journey</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From consultation to recovery — your seamless medical tourism journey in 5 simple steps.
          </p>
        </div>

        <div className="timeline__steps">
          <div className="timeline__line" />
          {steps.map((step, index) => (
            <div
              className="timeline__step"
              key={index}
              data-animate="fade-up"
              data-delay={`${index * 0.12}`}
            >
              <div className="timeline__step-number">{index + 1}</div>
              <div className="timeline__step-icon">{step.icon}</div>
              <h3 className="timeline__step-title">{step.title}</h3>
              <p className="timeline__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
