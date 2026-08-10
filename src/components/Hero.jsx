import { useEffect, useRef, useState } from 'react'
import { FaPlay, FaGlobeAmericas, FaPlane, FaHotel, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import './Hero.css'


const typewriterWords = ['Confidence.', 'Smile.', 'Hairline.', 'Beauty.']

export default function Hero() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)

  // Typewriter state
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)


  useEffect(() => {
    let ticker = setTimeout(() => {
      const i = loopNum % typewriterWords.length
      const fullText = typewriterWords[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))
      setTypingSpeed(isDeleting ? 40 : 100)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(300)
      }
    }, typingSpeed)

    return () => clearTimeout(ticker)
  }, [text, isDeleting, loopNum, typingSpeed])

  useEffect(() => {
    // Mouse parallax effect for right image and cards
    const handleMouseMove = (e) => {
      if (!heroRef.current || window.innerWidth < 768) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`
      }

      const cards = heroRef.current.querySelectorAll('.hero__float-card')
      cards.forEach((card, i) => {
        const factor = (i + 1) * 0.3
        card.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Video Background */}
      <div className="hero__bg">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero__video-bg"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__container container">
        {/* Left Content */}
        <div className="hero__content">
          <span className="hero__label">
            Where Beauty Meets Science
          </span>

          <h1 className="hero__title">
            Transform Your <br />
            <span className="hero__typewriter">
              {text}
              <span className="hero__cursor">|</span>
            </span>
            <br />
            <span className="hero__title-nowrap">with World-Class Care</span>
          </h1>

          {/* <p className="hero__subtitle">
            Expert in Cosmetic Surgery, Dental Care, Hair Transplants & Online Consultations.
            Medical Tourism Support — Travel, Hotel & Translator services included.
          </p> */}

          <div className="hero__buttons">
            <a href="#booking" className="btn btn-primary hero__btn-book">
              <span>Book Free Consultation</span>
            </a>
            <a href="#gallery" className="btn btn-outline hero__btn-play">
              <FaPlay size={12} />
              <span>Explore Gallery</span>
            </a>
          </div>



          <div className="hero__badges">
            <div className="hero__badge glass">
              <FaGlobeAmericas />
              <span>International Patients</span>
            </div>
            <div className="hero__badge glass">
              <FaPlane />
              <span>Travel Support</span>
            </div>
            <div className="hero__badge glass">
              <FaHotel />
              <span>Hotel Arranged</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero__visual">
          <div className="hero__image-wrapper" ref={imageRef}>
            <div className="hero__image-glow" />
            <img
              src="/images/hero-section-right.png"
              alt="IQS Clinic Istanbul - Premium Medical Facility"
              className="hero__image"
            />
            <div className="hero__image-border" />
            
            {/* Social Icons Bar */}
            <div className="hero__social">
              <a href="https://www.instagram.com/iqs.clinic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-ig"><FaInstagram /></a>
              <a href="https://www.youtube.com/@IqsClinic" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-yt"><FaYoutube /></a>
              <a href="https://m.facebook.com/61584583359911/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-fb"><FaFacebookF /></a>
            </div>
          </div>

          {/* Right Visual elements can be added here later */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Scroll Down</span>
      </div>
    </section>
  )
}
