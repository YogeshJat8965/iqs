import { useState, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { FaTimes, FaPaperPlane, FaRobot, FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa'
import './Chatbot.css'

// Initialize Gemini (Will fail gracefully if key is missing)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(API_KEY)

const SYSTEM_PROMPT = `
You are the AI assistant for IQS Clinic, a premium medical tourism clinic in Istanbul, Turkey, led by Dr. IQRA KHALID.

Your role is to help website visitors with queries about:
- Services (Hair Transplants, Dental Treatments, Cosmetic Surgeries)
- Patient journey (Airport Pickup, Hotel, Treatment)
- Clinic info & Bookings

CRITICAL RULES FOR RESPONSES:
1. ALWAYS be extremely concise. Keep responses to 2-3 short sentences max.
2. Use bullet points when listing services or features.
3. Never provide exact pricing. Say "Prices are personalized. Book a free consultation for your quote!"
4. Never give medical diagnoses.
5. Do not use markdown links. If a user asks for contact info, socials, or location, provide the raw URL exactly like this:
   - WhatsApp: https://wa.me/905066494748
   - Instagram: https://instagram.com/iqs.clinic
   - Facebook: https://facebook.com/iqs.clinic
   - Maps: https://maps.google.com/?q=IQS+Clinic+Istanbul
6. Do not overwhelm the user with too much text in a single message.
7. Respond in the user's language.

CLINIC FACTS:
- Name: IQS Clinic Medical Center
- Doctor: Dr. IQRA KHALID
- Location: Istanbul, Turkey
- Hours: Mon-Sat 10:00 AM - 6:00 PM, Sunday Closed
- Phone/WhatsApp: +90 506 649 4748
- Free airport transfer, hotel, translator included
`

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! 👋 Welcome to IQS Clinic. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  
  // Store the chat session so it remembers context
  const [chatSession, setChatSession] = useState(null)

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    // Initialize the chat session
    if (API_KEY) {
      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-3.5-flash',
          systemInstruction: SYSTEM_PROMPT,
        })
        const session = model.startChat({
          history: [
            { role: 'user', parts: [{ text: 'Hello' }] },
            { role: 'model', parts: [{ text: 'Hello! 👋 Welcome to IQS Clinic. How can I help you today?' }] }
          ]
        })
        setChatSession(session)
      } catch (err) {
        console.error('Gemini Init Error:', err)
      }
    }
  }, [])

  const handleSend = async (e) => {
    e?.preventDefault()
    
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    
    sendDirectMessage(userMessage)
  }

  const handleQuickReply = (text) => {
    setInput(text)
    sendDirectMessage(text)
  }

  const sendDirectMessage = async (userMessage) => {
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    
    if (!API_KEY) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', text: 'Please configure VITE_GEMINI_API_KEY in your .env file to activate the AI assistant.' }])
        setIsTyping(false)
      }, 1000)
      return
    }

    setIsTyping(true)

    try {
      if (!chatSession) throw new Error('Chat session not initialized. Make sure your API key is valid.')
      
      const result = await chatSession.sendMessage(userMessage)
      const responseText = result.response.text()
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }])
    } catch (error) {
      console.error('Chat Error:', error)
      setMessages(prev => [...prev, { role: 'model', text: `Connection Error: ${error.message}. (Please check your API key)` }])
    } finally {
      setIsTyping(false)
    }
  }

  // Format the text to handle basic markdown (bold, bullets, and links)
  const formatText = (text) => {
    // 1. Remove markdown link syntax [text](url) -> just url so our regex catches it
    let cleanText = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$2');
    cleanText = cleanText.replace(/\[(https?:\/\/[^\s)]+)\]/g, '$1'); // if it's just [url]
    
    // 2. Bold formatting
    cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    cleanText = cleanText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // 3. Bullets (replace lines starting with * or -)
    cleanText = cleanText.replace(/^[*-]\s+(.*)/gm, '&bull; $1');
    
    // 4. Newlines
    cleanText = cleanText.replace(/\n/g, '<br/>');

    // 5. Convert URLs to clickable links or buttons
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = cleanText.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        let cleanUrl = part.replace(/[.,)]+$/, '') // remove trailing punctuation
        
        if (cleanUrl.includes('wa.me')) {
          return (
            <div key={i} style={{ margin: '8px 0' }}>
              <a href={cleanUrl} target="_blank" rel="noopener noreferrer" className="chatbot-btn chatbot-btn--wa">
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>
          )
        }
        if (cleanUrl.includes('instagram.com')) {
          return (
            <div key={i} style={{ margin: '8px 0' }}>
              <a href={cleanUrl} target="_blank" rel="noopener noreferrer" className="chatbot-btn chatbot-btn--ig">
                <FaInstagram /> Follow on Instagram
              </a>
            </div>
          )
        }
        if (cleanUrl.includes('facebook.com')) {
          return (
            <div key={i} style={{ margin: '8px 0' }}>
              <a href={cleanUrl} target="_blank" rel="noopener noreferrer" className="chatbot-btn chatbot-btn--fb">
                <FaFacebook /> Visit Facebook
              </a>
            </div>
          )
        }
        if (cleanUrl.includes('maps.google.com') || cleanUrl.includes('goo.gl/maps')) {
          return (
            <div key={i} style={{ margin: '8px 0' }}>
              <a href={cleanUrl} target="_blank" rel="noopener noreferrer" className="chatbot-btn chatbot-btn--maps">
                <FaMapMarkerAlt /> View on Google Maps
              </a>
            </div>
          )
        }

        return <a key={i} href={cleanUrl} target="_blank" rel="noopener noreferrer" style={{color: '#2aabe2', textDecoration: 'underline'}}>{cleanUrl}</a>
      }
      return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
    })
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'chatbot-toggle--hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chatbot"
      >
        <FaRobot className="chatbot-toggle__icon" />
        <span className="chatbot-toggle__badge">1</span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window glass ${isOpen ? 'chatbot-window--open' : ''}`}>
        
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__info">
            <div className="chatbot-header__avatar">
              <FaRobot />
            </div>
            <div>
              <h3 className="chatbot-header__title">IQS Assistant</h3>
              <span className="chatbot-header__status">
                <span className="chatbot-header__status-dot"></span> Online
              </span>
            </div>
          </div>
          <button className="chatbot-header__close" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-message chatbot-message--${msg.role}`}>
              {msg.role === 'model' && (
                <div className="chatbot-message__avatar">
                  <FaRobot />
                </div>
              )}
              <div className="chatbot-message__bubble">
                {formatText(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-message chatbot-message--model">
              <div className="chatbot-message__avatar">
                <FaRobot />
              </div>
              <div className="chatbot-message__bubble">
                <div className="chatbot-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies (show only if no user messages yet, or just below input) */}
        {messages.length === 1 && (
          <div className="chatbot-quick-replies">
            <button onClick={() => handleQuickReply("What services do you offer?")}>What services do you offer?</button>
            <button onClick={() => handleQuickReply("How much does a hair transplant cost?")}>Cost of Hair Transplant?</button>
            <button onClick={() => handleQuickReply("Where are you located?")}>Where are you located?</button>
          </div>
        )}

        {/* Input */}
        <form className="chatbot-input" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" disabled={!input.trim() || isTyping}>
            <FaPaperPlane />
          </button>
        </form>

      </div>
    </>
  )
}
