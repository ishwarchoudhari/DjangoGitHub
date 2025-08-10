'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import Navigation from '@/components/layout/Navigation'
import { format } from 'date-fns'

interface Booking {
  id: string
  artistId: string
  artistName: string
  artistImage: string
  service: string
  date: Date
  time: string
  duration: string
  price: number
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled'
  location: string
  artistPhone: string
  artistRating: number
  artistSpecializations: string[]
  notes?: string
  canReschedule: boolean
  canCancel: boolean
}

export default function BookingsPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [cancelReason, setCancelReason] = useState('')

  // Mock data for bookings
  const mockBookings: Booking[] = [
    {
      id: '1',
      artistId: 'artist1',
      artistName: 'Priya Sharma',
      artistImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      service: 'Bridal Makeup',
      date: new Date('2024-02-15'),
      time: '10:00 AM',
      duration: '3 hours',
      price: 15000,
      status: 'upcoming',
      location: 'Mumbai, Maharashtra',
      artistPhone: '+91 98765 43210',
      artistRating: 4.8,
      artistSpecializations: ['Bridal', 'Party', 'Traditional'],
      notes: 'Please bring your own foundation shade',
      canReschedule: true,
      canCancel: true
    },
    {
      id: '2',
      artistId: 'artist2',
      artistName: 'Anjali Patel',
      artistImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      service: 'Party Makeup',
      date: new Date('2024-01-20'),
      time: '2:00 PM',
      duration: '2 hours',
      price: 3000,
      status: 'completed',
      location: 'Delhi, NCR',
      artistPhone: '+91 98765 43211',
      artistRating: 4.6,
      artistSpecializations: ['Party', 'Casual', 'Glam'],
      canReschedule: false,
      canCancel: false
    },
    {
      id: '3',
      artistId: 'artist3',
      artistName: 'Meera Singh',
      artistImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      service: 'Traditional Makeup',
      date: new Date('2024-01-10'),
      time: '11:00 AM',
      duration: '2.5 hours',
      price: 2500,
      status: 'cancelled',
      location: 'Bangalore, Karnataka',
      artistPhone: '+91 98765 43212',
      artistRating: 4.9,
      artistSpecializations: ['Traditional', 'Bridal', 'Cultural'],
      notes: 'Cancelled due to artist unavailability',
      canReschedule: false,
      canCancel: false
    }
  ]

  const filteredBookings = mockBookings.filter(booking => {
    if (selectedTab === 'upcoming') return booking.status === 'upcoming'
    if (selectedTab === 'completed') return booking.status === 'completed'
    if (selectedTab === 'cancelled') return booking.status === 'cancelled'
    return false
  })

  const handleReschedule = () => {
    if (newDate && newTime && selectedBooking) {
      // Mock reschedule logic
      console.log('Rescheduling booking:', selectedBooking.id, 'to', newDate, newTime)
      setShowRescheduleModal(false)
      setNewDate('')
      setNewTime('')
      setSelectedBooking(null)
    }
  }

  const handleCancel = () => {
    if (cancelReason && selectedBooking) {
      // Mock cancel logic
      console.log('Cancelling booking:', selectedBooking.id, 'reason:', cancelReason)
      setShowCancelModal(false)
      setCancelReason('')
      setSelectedBooking(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <ClockIconSolid className="w-4 h-4" />
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4" />
      case 'cancelled':
        return <XMarkIcon className="w-4 h-4" />
      case 'rescheduled':
        return <ExclamationTriangleIcon className="w-4 h-4" />
      default:
        return <ClockIcon className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your beauty service appointments</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'upcoming', label: 'Upcoming', count: mockBookings.filter(b => b.status === 'upcoming').length },
                { key: 'completed', label: 'Completed', count: mockBookings.filter(b => b.status === 'completed').length },
                { key: 'cancelled', label: 'Cancelled', count: mockBookings.filter(b => b.status === 'cancelled').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No {selectedTab} bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedTab === 'upcoming' 
                  ? "You don't have any upcoming appointments. Book a beauty service to get started!"
                  : `You don't have any ${selectedTab} appointments yet.`
                }
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={booking.artistImage}
                        alt={booking.artistName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{booking.artistName}</h3>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600">{booking.artistRating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{booking.service}</span>
                            <span className="text-primary-600 font-semibold">₹{booking.price.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{format(booking.date, 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{booking.time} ({booking.duration})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </span>
                            {booking.notes && (
                              <span className="text-sm text-gray-500 italic">"{booking.notes}"</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                      
                      {booking.status === 'upcoming' && (
                        <div className="flex space-x-2">
                          {booking.canReschedule && (
                            <button
                              onClick={() => {
                                setSelectedBooking(booking)
                                setShowRescheduleModal(true)
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <PencilIcon className="w-3 h-3 mr-1" />
                              Reschedule
                            </button>
                          )}
                          
                          {booking.canCancel && (
                            <button
                              onClick={() => {
                                setSelectedBooking(booking)
                                setShowCancelModal(true)
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                            >
                              <XMarkIcon className="w-3 h-3 mr-1" />
                              Cancel
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {booking.status === 'upcoming' && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        Call Artist
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                        <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                        Message
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {showRescheduleModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reschedule Appointment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReschedule}
                  disabled={!newDate || !newTime}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reschedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Appointment</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your appointment with {selectedBooking.artistName}?
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Please provide a reason for cancellation..."
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="btn-secondary flex-1"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!cancelReason.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}