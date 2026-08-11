import { useState } from 'react'
import './BookingForm.css'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, send to backend or email service
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="booking" id="booking">
      <div className="booking__bg">
        <div className="booking__bg-shape booking__bg-shape--1" />
        <div className="booking__bg-shape booking__bg-shape--2" />
      </div>

      <div className="booking__container container">
        <div className="booking__content" data-animate="fade-right">
          <span className="section-label section-label--light">
            Begin Your Transformation
          </span>
          <h2 className="section-title section-title--light">
            Book Your Free Consultation
          </h2>
          <p className="section-subtitle section-subtitle--light">
            Take the first step towards your dream transformation. Our team will <br />
            get back to you within 24 hours with a personalized treatment plan.
          </p>

          <div className="booking__features">
            <div className="booking__feature">
              <span className="booking__feature-check">✓</span>
              <span>Free Online Consultation</span>
            </div>
            <div className="booking__feature">
              <span className="booking__feature-check">✓</span>
              <span>Personalized Treatment Plan</span>
            </div>
            <div className="booking__feature">
              <span className="booking__feature-check">✓</span>
              <span>No Hidden Costs</span>
            </div>
            <div className="booking__feature">
              <span className="booking__feature-check">✓</span>
              <span>Response Within 24 Hours</span>
            </div>
          </div>
        </div>

        <form className="booking__form glass" onSubmit={handleSubmit} data-animate="fade-left">
          {submitted && (
            <div className="booking__success">
              🎉 Thank you! We'll contact you shortly.
            </div>
          )}

          <div className="booking__field">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
              id="booking-name"
            />
            <label htmlFor="booking-name">Full Name</label>
          </div>

          <div className="booking__field">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
              id="booking-email"
            />
            <label htmlFor="booking-email">Email Address</label>
          </div>

          <div className="booking__field">
            <input
              type="tel"
              name="phone"
              placeholder=" "
              value={formData.phone}
              onChange={handleChange}
              required
              id="booking-phone"
            />
            <label htmlFor="booking-phone">Phone / WhatsApp</label>
          </div>

          <div className="booking__field">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              id="booking-service"
            >
              <option value="">Select a Service</option>
              <option value="hair">Hair Transplant</option>
              <option value="dental">Dental Treatment</option>
              <option value="cosmetic">Cosmetic Surgery</option>
              <option value="consultation">General Consultation</option>
            </select>
          </div>

          <div className="booking__field">
            <textarea
              name="message"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              rows="4"
              id="booking-message"
            />
            <label htmlFor="booking-message">Your Message</label>
          </div>

          <button type="submit" className="btn btn-accent booking__submit">
            Book Free Consultation
          </button>
        </form>
      </div>
    </section>
  )
}
