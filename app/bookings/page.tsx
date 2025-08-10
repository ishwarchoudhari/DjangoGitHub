'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline'
import { Navigation } from '@/components/layout/Navigation'
import { format, addDays, isPast, isToday } from 'date-fns'

interface Booking {
  id: string
  artistId: string
  artistName: string
  artistImage: string
  serviceName: string
  servicePrice: number
  date: Date
  time: string
  duration: number
  location: string
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled'
  paymentStatus: 'paid' | 'pending' | 'refunded'
  artistPhone: string
  artistInstagram: string
  notes?: string
  createdAt: Date
}

export default function BookingsPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [cancelReason, setCancelReason] = useState('')

  // Mock data - replace with API calls
  const bookings: Booking[] = [
    {
      id: '1',
      artistId: 'artist1',
      artistName: 'Priya Sharma',
      artistImage: '/api/placeholder/60/60',
      serviceName: 'Bridal Makeup',
      servicePrice: 15000,
      date: addDays(new Date(), 7),
      time: '09:00',
      duration: 180,
      location: 'Mumbai, Maharashtra',
      status: 'upcoming',
      paymentStatus: 'paid',
      artistPhone: '+91 98765 43210',
      artistInstagram: '@priyasharma_makeup',
      notes: 'Please arrive 15 minutes early. Bring your own foundation if you have sensitive skin.',
      createdAt: new Date()
    },
    {
      id: '2',
      artistId: 'artist2',
      artistName: 'Aisha Khan',
      artistImage: '/api/placeholder/60/60',
      serviceName: 'Party Makeup',
      servicePrice: 3500,
      date: addDays(new Date(), 2),
      time: '18:00',
      duration: 90,
      location: 'Delhi, NCR',
      status: 'upcoming',
      paymentStatus: 'paid',
      artistPhone: '+91 98765 43211',
      artistInstagram: '@aishakhan_beauty',
      createdAt: new Date()
    },
    {
      id: '3',
      artistId: 'artist3',
      artistName: 'Meera Patel',
      artistImage: '/api/placeholder/60/60',
      serviceName: 'Hair Styling',
      servicePrice: 2500,
      date: addDays(new Date(), -3),
      time: '14:00',
      duration: 60,
      location: 'Bangalore, Karnataka',
      status: 'completed',
      paymentStatus: 'paid',
      artistPhone: '+91 98765 43212',
      artistInstagram: '@meerapatel_hair',
      createdAt: new Date()
    },
    {
      id: '4',
      artistId: 'artist4',
      artistName: 'Riya Singh',
      artistImage: '/api/placeholder/60/60',
      serviceName: 'Makeup Consultation',
      servicePrice: 1500,
      date: addDays(new Date(), -1),
      time: '11:00',
      duration: 45,
      location: 'Pune, Maharashtra',
      status: 'cancelled',
      paymentStatus: 'refunded',
      artistPhone: '+91 98765 43213',
      artistInstagram: '@riyasingh_beauty',
      createdAt: new Date()
    }
  ]

  const filteredBookings = bookings.filter(booking => {
    if (selectedTab === 'upcoming') return booking.status === 'upcoming'
    if (selectedTab === 'completed') return booking.status === 'completed'
    if (selectedTab === 'cancelled') return booking.status === 'cancelled'
    return false
  })

  const handleReschedule = () => {
    if (!selectedBooking || !newDate || !newTime) return
    
    // Mock API call - replace with actual API
    console.log('Rescheduling booking:', selectedBooking.id, 'to', newDate, newTime)
    
    setShowRescheduleModal(false)
    setSelectedBooking(null)
    setNewDate('')
    setNewTime('')
    
    // Show success message
    // toast.success('Booking rescheduled successfully!')
  }

  const handleCancel = () => {
    if (!selectedBooking || !cancelReason) return
    
    // Mock API call - replace with actual API
    console.log('Cancelling booking:', selectedBooking.id, 'reason:', cancelReason)
    
    setShowCancelModal(false)
    setSelectedBooking(null)
    setCancelReason('')
    
    // Show success message
    // toast.success('Booking cancelled successfully!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      case 'rescheduled': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <ClockIconSolid className="w-4 h-4" />
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />
      case 'cancelled': return <XMarkIcon className="w-4 h-4" />
      case 'rescheduled': return <ExclamationTriangleIcon className="w-4 h-4" />
      default: return <ClockIcon className="w-4 h-4" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'refunded': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
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
                { key: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
                { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
                { key: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {selectedTab} bookings</h3>
              <p className="text-gray-500">
                {selectedTab === 'upcoming' 
                  ? "You don't have any upcoming appointments. Start exploring beauty artists!"
                  : `You don't have any ${selectedTab} bookings yet.`
                }
              </p>
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.artistImage}
                        alt={booking.artistName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{booking.artistName}</h3>
                        <p className="text-gray-600">{booking.serviceName}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">₹{booking.servicePrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{booking.duration} min</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {format(booking.date, 'EEEE, MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isToday(booking.date) ? 'Today' : isPast(booking.date) ? 'Past' : format(booking.date, 'MMM d')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.time}</p>
                        <p className="text-sm text-gray-500">{booking.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-500">{booking.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Artist</p>
                        <p className="text-sm text-gray-500">{booking.artistName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Notes:</span> {booking.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                        Message Artist
                      </button>
                      <a
                        href={`tel:${booking.artistPhone}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        Call Artist
                      </a>
                      {booking.artistInstagram && (
                        <a
                          href={`https://instagram.com/${booking.artistInstagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <UserIcon className="w-4 h-4 mr-2" />
                          Instagram
                        </a>
                      )}
                    </div>

                    {booking.status === 'upcoming' && (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowRescheduleModal(true)
                          }}
                          className="inline-flex items-center px-3 py-2 border border-primary-300 shadow-sm text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <PencilIcon className="w-4 h-4 mr-2" />
                          Reschedule
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowCancelModal(true)
                          }}
                          className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XMarkIcon className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
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
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reschedule Booking</h3>
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
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReschedule}
                  disabled={!newDate || !newTime}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Booking</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your booking with {selectedBooking.artistName}? 
                This action cannot be undone.
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
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="btn-secondary"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!cancelReason}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}