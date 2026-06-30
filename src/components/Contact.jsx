import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaClock } from 'react-icons/fa'
import './Contact.css'

const hours = [
  { day: 'Monday', time: '10:00 AM – 6:00 PM' },
  { day: 'Tuesday', time: '10:00 AM – 6:00 PM' },
  { day: 'Wednesday', time: '10:00 AM – 6:00 PM' },
  { day: 'Thursday', time: '10:00 AM – 6:00 PM' },
  { day: 'Friday', time: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
  { day: 'Sunday', time: 'Closed', closed: true },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__container container">
        <div className="contact__header" data-animate="fade-up">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Find Us in Istanbul</h2>
        </div>

        <div className="contact__grid">
          {/* Map */}
          <div className="contact__map" data-animate="fade-right" style={{ position: 'relative' }}>
            <a 
              href="https://maps.app.goo.gl/NXvebZ1hvsC5NvU79?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__map-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                cursor: 'pointer',
                borderRadius: 'var(--radius-lg)'
              }}
              aria-label="Open in Google Maps"
            ></a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385396.3509036986!2d28.731990866470885!3d41.005369928498765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2s!4v1706715893000"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen
              loading="lazy"
              title="IQS Clinic Location"
            />
          </div>

          {/* Info */}
          <div className="contact__info" data-animate="fade-left">
            <div className="contact__card">
              <div className="contact__card-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Location</h4>
                <p>Istanbul, Istanbul Türkiye</p>
                <a
                  href="https://maps.app.goo.gl/NXvebZ1hvsC5NvU79?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="contact__card">
              <div className="contact__card-icon"><FaPhone /></div>
              <div>
                <h4>Phone / WhatsApp</h4>
                <a href="https://wa.me/905066494748" target="_blank" rel="noopener noreferrer">
                  +90 506 649 4748
                </a>
              </div>
            </div>

            <div className="contact__card">
              <div className="contact__card-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:cliniciqs@gmail.com">cliniciqs@gmail.com</a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="contact__hours">
              <div className="contact__hours-header">
                <FaClock />
                <h4>Working Hours</h4>
              </div>
              <ul>
                {hours.map((h) => (
                  <li key={h.day} className={h.closed ? 'contact__hours-closed' : ''}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="contact__social">
              <a href="https://www.instagram.com/iqs.clinic/" target="_blank" rel="noopener noreferrer" className="contact__social-icon contact__social-icon--ig" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@IqsClinic" target="_blank" rel="noopener noreferrer" className="contact__social-icon contact__social-icon--yt" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="https://m.facebook.com/61584583359911/" target="_blank" rel="noopener noreferrer" className="contact__social-icon contact__social-icon--fb" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://wa.me/905066494748" target="_blank" rel="noopener noreferrer" className="contact__social-icon contact__social-icon--wa" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
