'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
  CheckIcon,
  CheckBadgeIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/layout/Navigation'

interface Message {
  id: string
  content: string
  senderId: string
  timestamp: Date
  isRead: boolean
  type: 'text' | 'image' | 'file'
  mediaUrl?: string
}

interface Conversation {
  id: string
  artist: Artist
  lastMessage: Message
  unreadCount: number
  isOnline: boolean
  lastSeen?: Date
}

interface Artist {
  id: string
  name: string
  profilePicture: string
  isVerified: boolean
  blueTick: boolean
  specializations: string[]
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockConversations: Conversation[] = [
      {
        id: '1',
        artist: {
          id: '1',
          name: 'Priya Sharma',
          profilePicture: '/api/placeholder/50/50',
          isVerified: true,
          blueTick: true,
          specializations: ['Bridal Makeup', 'Party Makeup']
        },
        lastMessage: {
          id: '1',
          content: 'Perfect! I\'ll see you tomorrow at 10 AM for your bridal trial.',
          senderId: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          isRead: false,
          type: 'text'
        },
        unreadCount: 2,
        isOnline: true
      },
      {
        id: '2',
        artist: {
          id: '2',
          name: 'Aisha Khan',
          profilePicture: '/api/placeholder/50/50',
          isVerified: true,
          blueTick: false,
          specializations: ['Natural Makeup', 'Hair Styling']
        },
        lastMessage: {
          id: '2',
          content: 'Thank you for the booking! I\'ve sent you the confirmation.',
          senderId: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          isRead: true,
          type: 'text'
        },
        unreadCount: 0,
        isOnline: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        id: '3',
        artist: {
          id: '3',
          name: 'Meera Patel',
          profilePicture: '/api/placeholder/50/50',
          isVerified: true,
          blueTick: true,
          specializations: ['Skincare', 'Bridal Makeup']
        },
        lastMessage: {
          id: '3',
          content: 'Your skincare consultation is scheduled for next Tuesday.',
          senderId: '3',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isRead: true,
          type: 'text'
        },
        unreadCount: 0,
        isOnline: true
      }
    ]

    setConversations(mockConversations)
    setFilteredConversations(mockConversations)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      // Mock messages - replace with actual API call
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hi Priya! I\'m interested in booking bridal makeup for my wedding next month.',
          senderId: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          isRead: true,
          type: 'text'
        },
        {
          id: '2',
          content: 'Hello! Congratulations on your wedding! I\'d love to help you look beautiful on your special day.',
          senderId: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          isRead: true,
          type: 'text'
        },
        {
          id: '3',
          content: 'What date is your wedding? And would you like to schedule a trial session first?',
          senderId: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          isRead: true,
          type: 'text'
        },
        {
          id: '4',
          content: 'My wedding is on March 15th, and yes, I\'d definitely like a trial session!',
          senderId: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          isRead: true,
          type: 'text'
        },
        {
          id: '5',
          content: 'Perfect! I have availability for trials on March 1st and 8th. Which works better for you?',
          senderId: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          isRead: true,
          type: 'text'
        },
        {
          id: '6',
          content: 'March 8th would be great! What time do you have available?',
          senderId: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
          isRead: true,
          type: 'text'
        },
        {
          id: '7',
          content: 'I have slots at 10 AM, 2 PM, and 6 PM. The trial session takes about 2-3 hours.',
          senderId: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
          isRead: true,
          type: 'text'
        },
        {
          id: '8',
          content: '10 AM works perfectly! I\'ll book that slot.',
          senderId: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
          isRead: true,
          type: 'text'
        },
        {
          id: '9',
          content: 'Perfect! I\'ll see you tomorrow at 10 AM for your bridal trial.',
          senderId: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isRead: false,
          type: 'text'
        }
      ]

      setMessages(mockMessages)
    }
  }, [selectedConversation])

  useEffect(() => {
    // Filter conversations based on search
    const filtered = conversations.filter(conversation =>
      conversation.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.artist.specializations.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    setFilteredConversations(filtered)
  }, [conversations, searchQuery])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: 'user',
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update conversation with new last message
    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            lastMessage: message,
            unreadCount: 0
          }
        : conv
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className="border-r border-gray-200">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="overflow-y-auto h-[calc(600px-120px)]">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className={`p-4 cursor-pointer border-b border-gray-100 ${
                      selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.artist.profilePicture}
                          alt={conversation.artist.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          conversation.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.artist.name}
                            </h3>
                            {conversation.artist.isVerified && (
                              <CheckBadgeIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                            {conversation.artist.blueTick && (
                              <CheckBadgeIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate mb-1">
                          {conversation.lastMessage.content}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {conversation.artist.specializations.slice(0, 2).map((spec, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                          
                          {conversation.unreadCount > 0 && (
                            <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={selectedConversation.artist.profilePicture}
                            alt={selectedConversation.artist.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            selectedConversation.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-1">
                            <h3 className="font-semibold text-gray-900">
                              {selectedConversation.artist.name}
                            </h3>
                            {selectedConversation.artist.isVerified && (
                              <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                            )}
                            {selectedConversation.artist.blueTick && (
                              <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedConversation.isOnline ? 'Online' : 
                              selectedConversation.lastSeen ? 
                                `Last seen ${formatLastSeen(selectedConversation.lastSeen)}` : 
                                'Offline'
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors">
                          <PhoneIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors">
                          <VideoCameraIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-between mt-2 text-xs ${
                            message.senderId === 'user' ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.senderId === 'user' && (
                              <div className="flex items-center space-x-1">
                                {message.isRead ? (
                                  <CheckIcon className="w-3 h-3 text-blue-300" />
                                ) : (
                                  <ClockIcon className="w-3 h-3" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <PaperAirplaneIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}