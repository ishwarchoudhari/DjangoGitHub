'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Heart,
  CheckCircle,
  SlidersHorizontal,
  X,
  Calendar,
  IndianRupee,
  Users,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Mock data - expanded list of artists
const artists = [
  {
    id: '1',
    name: 'Priya Sharma',
    specialties: ['Bridal', 'Party'],
    rating: 4.9,
    totalReviews: 234,
    location: 'Bandra, Mumbai',
    profilePicture: '/api/placeholder/300/300',
    isVerified: true,
    isOnline: true,
    startingPrice: 1500,
    totalBookings: 567,
    experience: 5,
    bio: 'Award-winning makeup artist specializing in bridal and party makeup. Featured in Vogue India.',
    availableToday: true,
    portfolio: ['/api/placeholder/200/200', '/api/placeholder/200/200', '/api/placeholder/200/200'],
  },
  {
    id: '2',
    name: 'Asha Patel',
    specialties: ['Professional', 'Casual'],
    rating: 4.8,
    totalReviews: 189,
    location: 'Andheri, Mumbai',
    profilePicture: '/api/placeholder/300/300',
    isVerified: true,
    isOnline: false,
    startingPrice: 1200,
    totalBookings: 423,
    experience: 3,
    bio: 'Celebrity makeup artist with expertise in natural and professional looks.',
    availableToday: false,
    portfolio: ['/api/placeholder/200/200', '/api/placeholder/200/200'],
  },
  {
    id: '3',
    name: 'Kavya Singh',
    specialties: ['Bridal', 'Special Occasion'],
    rating: 4.9,
    totalReviews: 312,
    location: 'Juhu, Mumbai',
    profilePicture: '/api/placeholder/300/300',
    isVerified: true,
    isOnline: true,
    startingPrice: 2000,
    totalBookings: 789,
    experience: 7,
    bio: 'Luxury bridal makeup specialist. Over 500 successful bridal transformations.',
    availableToday: true,
    portfolio: ['/api/placeholder/200/200', '/api/placeholder/200/200', '/api/placeholder/200/200', '/api/placeholder/200/200'],
  },
  {
    id: '4',
    name: 'Reena Kapoor',
    specialties: ['Editorial', 'Fashion'],
    rating: 4.7,
    totalReviews: 156,
    location: 'Worli, Mumbai',
    profilePicture: '/api/placeholder/300/300',
    isVerified: true,
    isOnline: true,
    startingPrice: 2500,
    totalBookings: 234,
    experience: 6,
    bio: 'Fashion and editorial makeup artist. Worked with top fashion photographers.',
    availableToday: false,
    portfolio: ['/api/placeholder/200/200', '/api/placeholder/200/200'],
  },
  {
    id: '5',
    name: 'Sneha Gupta',
    specialties: ['Casual', 'Party'],
    rating: 4.6,
    totalReviews: 98,
    location: 'Powai, Mumbai',
    profilePicture: '/api/placeholder/300/300',
    isVerified: false,
    isOnline: true,
    startingPrice: 800,
    totalBookings: 156,
    experience: 2,
    bio: 'Young and talented makeup artist specializing in trendy looks.',
    availableToday: true,
    portfolio: ['/api/placeholder/200/200', '/api/placeholder/200/200', '/api/placeholder/200/200'],
  },
];

const categories = ['All', 'Bridal', 'Party', 'Professional', 'Casual', 'Editorial', 'Fashion', 'Special Occasion'];
const locations = ['All Locations', 'Bandra', 'Andheri', 'Juhu', 'Worli', 'Powai'];
const sortOptions = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Most Experienced', value: 'experience' },
];

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showAvailableToday, setShowAvailableToday] = useState(false);

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || artist.specialties.includes(selectedCategory);
    const matchesLocation = selectedLocation === 'All Locations' || artist.location.includes(selectedLocation);
    const matchesPrice = artist.startingPrice >= priceRange[0] && artist.startingPrice <= priceRange[1];
    const matchesOnline = !showOnlineOnly || artist.isOnline;
    const matchesVerified = !showVerifiedOnly || artist.isVerified;
    const matchesAvailable = !showAvailableToday || artist.availableToday;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && 
           matchesOnline && matchesVerified && matchesAvailable;
  });

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.startingPrice - b.startingPrice;
      case 'price_high':
        return b.startingPrice - a.startingPrice;
      case 'experience':
        return b.experience - a.experience;
      default: // popular
        return b.totalBookings - a.totalBookings;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Beauty Artists</h1>
              <p className="text-gray-600 mt-1">Find and book verified makeup artists near you</p>
            </div>
            <div className="text-sm text-gray-500">
              {sortedArtists.length} artists found
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search artists by name or specialty..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span>Online only</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showVerifiedOnly}
                  onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span>Verified only</span>
              </label>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Filters</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={showAvailableToday}
                        onChange={(e) => setShowAvailableToday(e.target.checked)}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span>Available today</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArtists.map((artist) => (
            <Link key={artist.id} href={`/artists/${artist.id}`}>
              <div className="instagram-card group cursor-pointer h-full">
                <div className="relative">
                  <img
                    src={artist.profilePicture}
                    alt={artist.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle favorite
                      }}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    {artist.isOnline && (
                      <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Online</span>
                      </div>
                    )}
                    {artist.availableToday && (
                      <div className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <Calendar className="h-3 w-3" />
                        <span>Today</span>
                      </div>
                    )}
                    {artist.isVerified && (
                      <div className="verified-badge">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                        {artist.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{artist.rating}</span>
                      <span className="text-sm text-gray-500">({artist.totalReviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {artist.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{artist.totalBookings} bookings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{artist.experience} years exp</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting at</span>
                      <div className="text-lg font-bold text-gray-900 flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {artist.startingPrice.toLocaleString()}
                      </div>
                    </div>
                    <button className="zomato-button-primary text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {sortedArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}