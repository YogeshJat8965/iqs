import { FaGlobeAmericas, FaPlane, FaLanguage, FaMoneyBillWave, FaHospitalAlt, FaShieldAlt } from 'react-icons/fa'
import './WhyChoose.css'

const features = [
  { icon: <FaGlobeAmericas />, title: 'International Support', desc: 'Dedicated coordinators for patients from all over the world', size: 'large' },
  { icon: <FaPlane />, title: 'Travel & Hotel', desc: 'Complete travel arrangements and premium hotel accommodations', size: 'small' },
  { icon: <FaLanguage />, title: 'Translator Services', desc: 'Professional translators for seamless communication', size: 'small' },
  { icon: <FaMoneyBillWave />, title: 'Competitive Pricing', desc: 'World-class quality at affordable prices', size: 'small' },
  { icon: <FaHospitalAlt />, title: 'Modern Facility', desc: 'State-of-the-art equipment and sterile environment', size: 'small' },
  { icon: <FaShieldAlt />, title: 'Certified & Trusted', desc: 'Licensed professionals with proven track record', size: 'large' },
]

export default function WhyChoose() {
  return (
    <section className="why" id="why-choose">
      <div className="why__container container">
        <div className="why__header" data-animate="fade-up">
          <span className="section-label">Why IQS Clinic</span>
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Everything you need for a seamless medical tourism experience.
          </p>
        </div>

        <div className="why__grid">
          {features.map((feature, index) => (
            <div
              className={`why__card glass ${feature.size === 'large' ? 'why__card--large' : ''}`}
              key={index}
              data-animate="fade-up"
              data-delay={`${index * 0.1}`}
            >
              <div className="why__card-icon">{feature.icon}</div>
              <h3 className="why__card-title">{feature.title}</h3>
              <p className="why__card-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
