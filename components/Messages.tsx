import Image from 'next/image'
import { ChatMessage } from '@/actions/stream-message'

interface MessagesProps {
  messages: ChatMessage[]
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 rounded-lg p-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
          {msg.role === 'assistant' && (
            <div className="mr-2">
              <Image src="/assistant-icon.png" width={24} height={24} alt="Assistant" />
            </div>
          )}
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-transparent text-white'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  )
}
