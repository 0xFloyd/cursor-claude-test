import { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isStreaming: boolean
}

export default function ChatInput({ onSendMessage, isStreaming }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim() !== '' && !isStreaming) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="mt-auto flex justify-center">
      <div className="w-full max-w-[800px]">
        <div className="flex items-center bg-white/10 rounded-lg p-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-white focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={isStreaming}
            className={`ml-2 text-white ${isStreaming ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
