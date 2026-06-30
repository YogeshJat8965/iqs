import './Marquee.css'

const defaultText = '✨ Hair Transplants • Dental Excellence • Cosmetic Surgery • Medical Tourism • Istanbul Turkey • Free Consultation • Trusted by International Patients ✨ Hair Transplants • Dental Excellence • Cosmetic Surgery • Medical Tourism • Istanbul Turkey • Free Consultation • Trusted by International Patients'

export default function Marquee({ reverse = false, text = defaultText }) {
  return (
    <section className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
      <div className="marquee__track">
        <span className="marquee__text">{text}</span>
        <span className="marquee__text">{text}</span>
      </div>
    </section>
  )
}
