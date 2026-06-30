import { FaCut, FaTooth, FaMagic } from 'react-icons/fa'
import './Services.css'

const services = [
  {
    icon: <FaCut />,
    title: 'Hair Transplants',
    description: 'Advanced FUE & DHI hair transplant procedures with natural-looking results. Our state-of-the-art technology ensures minimal downtime and maximum density.',
    image: '/images/service-hair.png',
    features: ['FUE & DHI Methods', 'Natural Hairline Design', 'Painless Procedure', 'Lifetime Results'],
  },
  {
    icon: <FaTooth />,
    title: 'Dental Treatments',
    description: 'Complete dental care from veneers to implants. Hollywood smile makeovers using premium materials for a perfect, lasting smile.',
    image: '/images/service-dental.png',
    features: ['Dental Veneers', 'Teeth Whitening', 'Dental Implants', 'Hollywood Smile'],
  },
  {
    icon: <FaMagic />,
    title: 'Cosmetic Surgeries',
    description: 'Expert cosmetic and plastic surgery procedures tailored to your goals. Rhinoplasty, facelifts, body contouring, and more by certified surgeons.',
    image: '/images/service-cosmetic.png',
    features: ['Rhinoplasty', 'Facelift', 'Liposuction', 'Body Contouring'],
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services__container container">
        <div className="services__header" data-animate="fade-up">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Premium Services</h2>
          <p className="section-subtitle">
            World-class treatments delivered with precision, care, and the latest medical innovations.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <div
              className="services__card"
              key={index}
              data-animate="fade-up"
              data-delay={`${index * 0.15}`}
            >
              <div className="services__card-image">
                <img src={service.image} alt={service.title} loading="lazy" />
                <div className="services__card-overlay" />
              </div>

              <div className="services__card-content">
                <div className="services__card-icon">{service.icon}</div>
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">{service.description}</p>

                <ul className="services__card-features">
                  {service.features.map((f, i) => (
                    <li key={i}>
                      <span className="services__feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#booking" className="services__card-link">
                  Book Consultation →
                </a>
              </div>

              <div className="services__card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
