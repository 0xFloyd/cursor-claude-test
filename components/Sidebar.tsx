import React, { useState } from 'react'
import { Trash2, Plus } from 'lucide-react' // Added Plus icon
import { DeleteChatDialog } from './DeleteChatDialog'

interface Chat {
  id: string
  name: string
  messages: ChatMessage[]
}

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
}

interface SidebarProps {
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  currentChatId: string | null
  setCurrentChatId: (id: string | null) => void
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  createNewChat: () => void
}

function Sidebar({ chats, setChats, currentChatId, setCurrentChatId, setMessages, createNewChat }: SidebarProps) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [chatToDelete, setChatToDelete] = useState<string | null>(null)

  const handleDeleteChat = (chatId: string) => {
    setChatToDelete(chatId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (chatToDelete) {
      // Delete chat from state
      setChats(chats.filter((chat) => chat.id !== chatToDelete))

      // Delete chat from local storage
      const storedChats = JSON.parse(localStorage.getItem('chats') || '[]')
      const updatedStoredChats = storedChats.filter((chat: Chat) => chat.id !== chatToDelete)
      localStorage.setItem('chats', JSON.stringify(updatedStoredChats))

      if (currentChatId === chatToDelete) {
        setCurrentChatId(null)
        setMessages([])
      }

      setDeleteDialogOpen(false)
      setChatToDelete(null)
    }
  }

  return (
    <div className="w-[300px] bg-white/10 border-r border-white/25 text-white p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chats</h2>
        <button onClick={createNewChat} className="text-white">
          <Plus size={24} />
        </button>
      </div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onMouseEnter={() => setHoveredChat(chat.id)}
          onMouseLeave={() => setHoveredChat(null)}
          className={`p-2 cursor-pointer relative ${currentChatId === chat.id ? 'bg-gray-700' : ''}`}
          onClick={() => {
            setCurrentChatId(chat.id)
            setMessages(chat.messages)
          }}
        >
          {chat.name}
          {hoveredChat === chat.id && (
            <Trash2
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              size={18}
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteChat(chat.id)
              }}
            />
          )}
        </div>
      ))}

      <DeleteChatDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        chatName={chats.find((chat) => chat.id === chatToDelete)?.name || ''}
      />
    </div>
  )
}

export default Sidebar
