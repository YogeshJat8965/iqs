import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo.png'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__container container">
        <a href="#hero" className="navbar__logo" onClick={(e) => handleClick(e, '#hero')}>
          <img src={logo} alt="IQS Clinic" className="navbar__logo-img" />
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/905066494748"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__cta btn btn-primary"
        >
          Book Consultation
        </a>

        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.08}s` }}>
              <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ animationDelay: `${navLinks.length * 0.08}s` }}>
            <a
              href="https://wa.me/905066494748"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ marginTop: '16px' }}
            >
              Book Consultation
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
