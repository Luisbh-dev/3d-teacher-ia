import { useState, useRef, useEffect } from 'react'
import { Mic, Send, MicOff, Play, Pause, Sparkles, Volume2, VolumeX } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export const UI = ({ 
    messages, 
    sendMessage, 
    isLoading, 
    startListening, 
    stopListening, 
    isListening, 
    isPaused,
    togglePause,
    isMuted,
    toggleMute,
    volume,
    handleVolumeChange
}) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  
  // Simple detection for UI text (could be passed from hook, but keeping it simple here)
  const isSpanish = (navigator.language || navigator.userLanguage).startsWith('es')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return
    await sendMessage(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="ui-layer">
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 10, alignItems: 'center', pointerEvents: 'auto' }}>
        <span style={{ fontWeight: 'bold', marginRight: 10 }}>Glot Teacher</span>
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>v1.0</span>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="message ai">
              {isSpanish ? 'Pensando...' : 'Thinking...'}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-area" style={{ flexDirection: 'column', gap: 8 }}>
          
          {/* Audio Controls Bar */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 4 }}>
             {/* Pause/Resume */}
             <button
                onClick={togglePause}
                title={isPaused ? "Reanudar" : "Pausar"}
                className="secondary-button"
                style={{ 
                    background: isPaused ? '#4f46e5' : '#374151',
                    width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
             >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
             </button>

             {/* Mute Toggle */}
             <button
                onClick={toggleMute}
                title={isMuted ? "Activar sonido" : "Silenciar"}
                className="secondary-button"
                style={{ 
                    background: isMuted ? '#ef4444' : '#374151',
                    width: 36, height: 36, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}
             >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </button>
             
             {/* Volume Slider */}
             <div style={{ display: 'flex', alignItems: 'center', background: '#1f2937', borderRadius: 8, padding: '0 10px', height: 36, flex: 1 }}>
                <span style={{ fontSize: '0.7rem', marginRight: 8, opacity: 0.7 }}>VOL</span>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={volume} 
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: '#4f46e5', cursor: 'pointer' }}
                />
             </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button 
                className={`mic-button ${isListening ? 'listening' : ''}`}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop listening" : "Start listening"}
                style={{ width: 44, height: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
                {isListening ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            
            <input
                type="text"
                placeholder={isSpanish ? "Escribe un mensaje..." : "Type a message..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                style={{ height: 44, boxSizing: 'border-box' }}
            />
            
            <button 
                onClick={handleSend} 
                disabled={isLoading || !inputValue.trim()}
                style={{ width: 44, height: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
                <Send size={22} />
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, opacity: 0.6, fontSize: '0.75rem' }}>
            <Sparkles size={12} />
            <span>Powered by Gemini</span>
        </div>
      </div>
    </div>
  )
}
