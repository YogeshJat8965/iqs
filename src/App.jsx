import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Journey from './components/Journey'
import ReelsShowcase from './components/ReelsShowcase'
import Reviews from './components/Reviews'
import WhyChoose from './components/WhyChoose'
import Contact from './components/Contact'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/ScrollProgress'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Animate all elements with data-animate attribute
      const animateElements = document.querySelectorAll('[data-animate]')
      animateElements.forEach((el) => {
        const animType = el.dataset.animate
        const delay = parseFloat(el.dataset.delay) || 0

        let fromVars = { opacity: 0, duration: 0.8, delay }
        switch (animType) {
          case 'fade-up':
            fromVars.y = 50
            break
          case 'fade-down':
            fromVars.y = -50
            break
          case 'fade-left':
            fromVars.x = -50
            break
          case 'fade-right':
            fromVars.x = 50
            break
          case 'scale':
            fromVars.scale = 0.8
            break
          case 'fade':
            break
          default:
            fromVars.y = 30
        }

        gsap.from(el, {
          ...fromVars,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }

    // Small delay to ensure DOM is fully rendered before GSAP initializes
    const timer = setTimeout(() => {
      initGSAP()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <BeforeAfter />
      <Journey />
      <ReelsShowcase />
      {/* <Reviews /> */}
      <WhyChoose />
      <Marquee reverse text="★ Trusted by 500+ International Patients ★ State-of-the-Art Istanbul Clinic ★ Free Online Consultation ★ Medical Tourism Experts ★ Premium Care ★ Trusted by 500+ International Patients ★ State-of-the-Art Istanbul Clinic ★ Free Online Consultation ★ Medical Tourism Experts ★ Premium Care" />
      <Contact />
      <BookingForm />
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </div>
  )
}

export default App
