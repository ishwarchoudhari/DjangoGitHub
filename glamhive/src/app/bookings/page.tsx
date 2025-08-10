'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Phone,
  MessageCircle,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  ChevronRight,
  User,
  IndianRupee,
  Camera
} from 'lucide-react';
import Link from 'next/link';

// Mock data for bookings
const bookings = [
  {
    id: '1',
    service: {
      name: 'Bridal Makeup',
      category: 'BRIDAL',
      duration: 180,
      price: 20000,
    },
    artist: {
      id: '1',
      name: 'Priya Sharma',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      phone: '+91 98765 43210',
      rating: 4.9,
    },
    scheduledDate: '2024-02-15',
    scheduledTime: '09:00',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    totalAmount: 20000,
    bookingDate: '2024-01-15',
    location: 'Bandra, Mumbai',
    notes: 'Traditional Indian bridal look with heavy jewelry',
  },
  {
    id: '2',
    service: {
      name: 'Party Makeup',
      category: 'PARTY',
      duration: 90,
      price: 3500,
    },
    artist: {
      id: '2',
      name: 'Asha Patel',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      phone: '+91 87654 32109',
      rating: 4.8,
    },
    scheduledDate: '2024-02-20',
    scheduledTime: '18:00',
    status: 'PENDING',
    paymentStatus: 'PENDING',
    totalAmount: 3500,
    bookingDate: '2024-02-01',
    location: 'Andheri, Mumbai',
    notes: 'Evening party look, bold eyes',
  },
  {
    id: '3',
    service: {
      name: 'Professional Makeup',
      category: 'PROFESSIONAL',
      duration: 60,
      price: 2500,
    },
    artist: {
      id: '3',
      name: 'Kavya Singh',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      phone: '+91 76543 21098',
      rating: 4.9,
    },
    scheduledDate: '2024-01-25',
    scheduledTime: '14:00',
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    totalAmount: 2500,
    bookingDate: '2024-01-20',
    location: 'Juhu, Mumbai',
    notes: 'Corporate event, natural look',
  },
  {
    id: '4',
    service: {
      name: 'Casual Makeup',
      category: 'CASUAL',
      duration: 45,
      price: 1500,
    },
    artist: {
      id: '4',
      name: 'Reena Kapoor',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      phone: '+91 65432 10987',
      rating: 4.7,
    },
    scheduledDate: '2024-01-20',
    scheduledTime: '16:00',
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    totalAmount: 1500,
    bookingDate: '2024-01-18',
    location: 'Worli, Mumbai',
    notes: 'Date night look',
  },
];

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
  RESCHEDULED: 'bg-purple-100 text-purple-800',
};

const statusIcons: Record<string, typeof AlertCircle> = {
  PENDING: AlertCircle,
  CONFIRMED: CheckCircle,
  COMPLETED: CheckCircle,
  CANCELLED: XCircle,
  RESCHEDULED: RefreshCw,
};

const paymentStatusColors = {
  PENDING: 'text-yellow-600',
  PAID: 'text-green-600',
  REFUNDED: 'text-blue-600',
};

export default function BookingsPage() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const now = new Date();
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(`${booking.scheduledDate}T${booking.scheduledTime}`);
    const matchesSearch = booking.service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;

    if (selectedTab === 'upcoming') {
      return bookingDate >= now && booking.status !== 'CANCELLED' && matchesSearch && matchesStatus;
    } else if (selectedTab === 'past') {
      return (bookingDate < now || booking.status === 'COMPLETED' || booking.status === 'CANCELLED') && 
             matchesSearch && matchesStatus;
    }
    return matchesSearch && matchesStatus;
  });

  const upcomingCount = bookings.filter(b => {
    const date = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
    return date >= now && b.status !== 'CANCELLED';
  }).length;

  const pastCount = bookings.filter(b => {
    const date = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
    return date < now || b.status === 'COMPLETED' || b.status === 'CANCELLED';
  }).length;

  const handleAction = (bookingId: string, action: string) => {
    console.log(`${action} booking:`, bookingId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 mt-1">Manage your appointments and booking history</p>
            </div>
            <Link
              href="/artists"
              className="zomato-button-primary"
            >
              Book New Service
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'upcoming'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              onClick={() => setSelectedTab('past')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'past'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past ({pastCount})
            </button>
            <button
              onClick={() => setSelectedTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'all'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Bookings ({bookings.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const StatusIcon = statusIcons[booking.status];
              const isUpcoming = new Date(`${booking.scheduledDate}T${booking.scheduledTime}`) >= now;
              
              return (
                <div key={booking.id} className="zomato-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="instagram-avatar w-12 h-12">
                        <img
                          src={booking.artist.profilePicture}
                          alt={booking.artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{booking.service.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">by {booking.artist.name}</span>
                          {booking.artist.isVerified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{booking.artist.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusColors[booking.status]}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span>{booking.status}</span>
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-5 w-5" />
                        <span>{formatDate(booking.scheduledDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-5 w-5" />
                        <span>{formatTime(booking.scheduledTime)} ({booking.service.duration} mins)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span>{booking.location}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-5 w-5 text-gray-600" />
                        <span className="text-lg font-semibold text-gray-900">₹{booking.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className={`text-sm ${paymentStatusColors[booking.paymentStatus]}`}>
                        Payment: {booking.paymentStatus}
                      </div>
                      <div className="text-sm text-gray-500">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {booking.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                          <p className="text-sm text-gray-600">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleAction(booking.id, 'call')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Call Artist</span>
                      </button>
                      <button
                        onClick={() => handleAction(booking.id, 'message')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">Message</span>
                      </button>
                      {booking.status === 'COMPLETED' && (
                        <button
                          onClick={() => handleAction(booking.id, 'review')}
                          className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
                        >
                          <Star className="h-4 w-4" />
                          <span className="text-sm">Write Review</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      {booking.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleAction(booking.id, 'cancel')}
                            className="zomato-button-secondary text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAction(booking.id, 'reschedule')}
                            className="zomato-button-primary text-sm"
                          >
                            Reschedule
                          </button>
                        </>
                      )}
                      {booking.status === 'CONFIRMED' && isUpcoming && (
                        <>
                          <button
                            onClick={() => handleAction(booking.id, 'reschedule')}
                            className="zomato-button-secondary text-sm"
                          >
                            Reschedule
                          </button>
                          <Link
                            href={`/bookings/${booking.id}`}
                            className="zomato-button-primary text-sm"
                          >
                            View Details
                          </Link>
                        </>
                      )}
                      {booking.status === 'COMPLETED' && (
                        <Link
                          href={`/bookings/${booking.id}`}
                          className="zomato-button-secondary text-sm"
                        >
                          View Details
                        </Link>
                      )}
                      {booking.status === 'CANCELLED' && booking.paymentStatus === 'PAID' && (
                        <button
                          onClick={() => handleAction(booking.id, 'rebook')}
                          className="zomato-button-primary text-sm"
                        >
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedTab === 'upcoming' ? 'No upcoming bookings' : 
               selectedTab === 'past' ? 'No past bookings' : 'No bookings found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedTab === 'upcoming' 
                ? 'Book your first beauty service to get started!'
                : searchQuery 
                ? 'Try adjusting your search criteria.'
                : 'Your booking history will appear here.'}
            </p>
            {selectedTab === 'upcoming' && (
              <Link
                href="/artists"
                className="zomato-button-primary"
              >
                Browse Artists
              </Link>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}