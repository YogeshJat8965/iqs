import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronUp } from 'react-icons/fa'
import logo from '../assets/logo.png'
import './Footer.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={logo} alt="IQS Clinic" className="footer__logo-img" />
            </div>
            <p className="footer__brand-desc">
              Expert in Cosmetic Surgery, Dental Care, Hair Transplants & Online Consultations. 
              Medical Tourism Support — Travel, Hotel, Translator.
            </p>
            <div className="footer__social">
              <a href="https://www.instagram.com/iqs.clinic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.youtube.com/@IqsClinic" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://m.facebook.com/61584583359911/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://wa.me/905066494748" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Hair Transplants</a></li>
              <li><a href="#services">Dental Treatments</a></li>
              <li><a href="#services">Cosmetic Surgeries</a></li>
              <li><a href="#booking">Online Consultation</a></li>
              <li><a href="#booking">Treatment Plans</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Contact</h4>
            <ul className="footer__contact-list">
              <li>
                <FaMapMarkerAlt />
                <span>Istanbul, Turkey</span>
              </li>
              <li>
                <FaPhone />
                <a href="tel:+905066494748">+90 506 649 4748</a>
              </li>
              <li>
                <FaEnvelope />
                <a href="mailto:cliniciqs@gmail.com">cliniciqs@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p>© 2025 IQS Clinic. All rights reserved. | 📍 Istanbul, Turkey | 🌍 International Patients Welcome</p>
          <button className="footer__top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            <FaChevronUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
