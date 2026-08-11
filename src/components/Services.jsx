import { FaCut, FaTooth, FaMagic } from 'react-icons/fa'
import './Services.css'

const services = [
  {
    icon: <FaCut />,
    title: 'Hair Transplants',
    description: 'Advanced FUE & DHI treatments for natural-looking hair restoration.',
    video: '/hairTransplant.mp4',
  },
  {
    icon: <FaTooth />,
    title: 'Dental Treatments',
    description: 'Advanced dental care for healthy, confident and beautiful smiles.',
    video: '/dentalService.mp4',
  },
  {
    icon: <FaMagic />,
    title: 'Cosmetic Surgeries',
    description: 'Personalized aesthetic procedures for refined, natural-looking results.',
    video: '/cosmeticSurgery.mp4',
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
                <video
                  src={service.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="services__card-video"
                />
                <div className="services__card-icon">{service.icon}</div>
              </div>

              <div className="services__card-content">
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">{service.description}</p>

                <a href="#booking" className="services__card-link">
                  Explore Treatment →
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
