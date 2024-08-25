'use client'
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { streamMessage, ChatMessage } from '@/actions/stream-message'
import { readStreamableValue } from 'ai/rsc'
import Sidebar from '@/components/Sidebar'
import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

interface Chat {
  id: string
  name: string
  messages: ChatMessage[]
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  useEffect(() => {
    const savedChats = localStorage.getItem('chats')
    if (savedChats) {
      setChats(JSON.parse(savedChats))
    }
  }, [])

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats))
    }
  }, [chats])

  const createNewChat = () => {
    const newChat: Chat = {
      id: new Date().toISOString(),
      name: `New Chat ${chats.length + 1}`,
      messages: []
    }
    setChats((prevChats) => [newChat, ...prevChats])
    setCurrentChatId(newChat.id)
    setMessages([])
  }

  const handleSendMessage = async (message: string) => {
    if (message.trim() === '' || isStreaming) return

    const newUserMessage: ChatMessage = {
      id: messages.length,
      role: 'user',
      content: message
    }

    let updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setIsStreaming(true)

    // Create a new chat if there's no current chat
    if (!currentChatId) {
      const newChat: Chat = {
        id: new Date().toISOString(),
        name: `New Chat ${chats.length + 1}`,
        messages: updatedMessages
      }
      setChats([newChat, ...chats])
      setCurrentChatId(newChat.id)
    }

    const { output } = await streamMessage(updatedMessages)

    const newAssistantMessage: ChatMessage = {
      id: updatedMessages.length,
      role: 'assistant',
      content: ''
    }

    updatedMessages = [...updatedMessages, newAssistantMessage]
    setMessages(updatedMessages)

    for await (const delta of readStreamableValue(output)) {
      newAssistantMessage.content += delta
      setMessages([...updatedMessages])
    }

    setIsStreaming(false)

    // Update the current chat with the new messages
    if (currentChatId) {
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat))
      )
    }
  }

  return (
    <main className="bg-black flex min-h-screen relative">
      {isSidebarOpen && (
        <Sidebar
          chats={chats}
          setChats={setChats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          setMessages={setMessages}
          createNewChat={createNewChat}
        />
      )}

      {/* Chat interface */}
      <div className="flex-1 p-4 flex flex-col h-screen">
        {/* Chat title and buttons */}
        <div className="flex items-center mb-4 ">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white mr-2">
              <Menu size={24} />
            </button>
          </div>
          <h1 className="text-white text-2xl font-bold text-center">Chat Interface</h1>
        </div>

        <Messages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isStreaming={isStreaming} />
      </div>
    </main>
  )
}
