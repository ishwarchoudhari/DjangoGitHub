'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  MapPinIcon,
  CheckBadgeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Navigation from '@/components/layout/Navigation'

interface Artist {
  id: string
  name: string
  profilePicture: string
  location: string
  rating: number
  reviewCount: number
  isVerified: boolean
  blueTick: boolean
  experience: string
  specializations: string[]
  languages: string[]
  about: string
  services: Service[]
  availability: Availability
  contact: Contact
  portfolio: PortfolioItem[]
  isFavorited: boolean
}

interface Service {
  id: string
  name: string
  price: number
  duration: string
  description: string
  category: string
}

interface Availability {
  isOnline: boolean
  nextAvailable: string
  workingHours: string
  responseTime: string
}

interface Contact {
  phone: string
  email: string
  instagram?: string
  website?: string
}

interface PortfolioItem {
  id: string
  image: string
  caption: string
  category: string
  likes: number
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [showFilters, setShowFilters] = useState(false)

  const specializations = [
    { id: 'all', name: 'All Specializations', count: 0 },
    { id: 'bridal', name: 'Bridal Makeup', count: 45 },
    { id: 'party', name: 'Party Makeup', count: 38 },
    { id: 'natural', name: 'Natural Makeup', count: 32 },
    { id: 'hair', name: 'Hair Styling', count: 28 },
    { id: 'nails', name: 'Nail Art', count: 25 },
    { id: 'skincare', name: 'Skincare', count: 20 }
  ]

  const locations = [
    { id: 'all', name: 'All Locations', count: 0 },
    { id: 'mumbai', name: 'Mumbai', count: 35 },
    { id: 'delhi', name: 'Delhi NCR', count: 28 },
    { id: 'bangalore', name: 'Bangalore', count: 22 },
    { id: 'hyderabad', name: 'Hyderabad', count: 18 },
    { id: 'chennai', name: 'Chennai', count: 15 },
    { id: 'pune', name: 'Pune', count: 12 }
  ]

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        profilePicture: '/api/placeholder/80/80',
        location: 'Mumbai, Maharashtra',
        rating: 4.8,
        reviewCount: 127,
        isVerified: true,
        blueTick: true,
        experience: '8+ years',
        specializations: ['bridal', 'party', 'natural'],
        languages: ['English', 'Hindi', 'Marathi'],
        about: 'Professional makeup artist specializing in bridal and party makeup. Creating beautiful looks that enhance your natural beauty.',
        services: [
          { id: '1', name: 'Bridal Makeup', price: 20000, duration: '4-5 hours', description: 'Complete bridal look with trials', category: 'bridal' },
          { id: '2', name: 'Party Makeup', price: 3000, duration: '2 hours', description: 'Glamorous party look', category: 'party' },
          { id: '3', name: 'Natural Makeup', price: 1500, duration: '1.5 hours', description: 'Subtle everyday makeup', category: 'natural' }
        ],
        availability: {
          isOnline: true,
          nextAvailable: 'Tomorrow, 10:00 AM',
          workingHours: '9:00 AM - 8:00 PM',
          responseTime: 'Usually responds in 2 hours'
        },
        contact: {
          phone: '+91 98765 43210',
          email: 'priya.sharma@email.com',
          instagram: '@priyasharma_mua',
          website: 'www.priyasharma.com'
        },
        portfolio: [
          { id: '1', image: '/api/placeholder/300/400', caption: 'Bridal Glamour', category: 'bridal', likes: 234 },
          { id: '2', image: '/api/placeholder/300/400', caption: 'Party Ready', category: 'party', likes: 156 }
        ],
        isFavorited: false
      },
      {
        id: '2',
        name: 'Aisha Khan',
        profilePicture: '/api/placeholder/80/80',
        location: 'Delhi, NCR',
        rating: 4.9,
        reviewCount: 89,
        isVerified: true,
        blueTick: false,
        experience: '6+ years',
        specializations: ['bridal', 'hair', 'natural'],
        languages: ['English', 'Hindi', 'Urdu'],
        about: 'Creative makeup artist with expertise in bridal makeup and hair styling. Known for attention to detail and personalized service.',
        services: [
          { id: '4', name: 'Bridal Makeup', price: 25000, duration: '5-6 hours', description: 'Premium bridal package', category: 'bridal' },
          { id: '5', name: 'Hair Styling', price: 2000, duration: '1 hour', description: 'Professional hair styling', category: 'hair' }
        ],
        availability: {
          isOnline: true,
          nextAvailable: 'Today, 3:00 PM',
          workingHours: '10:00 AM - 7:00 PM',
          responseTime: 'Usually responds in 1 hour'
        },
        contact: {
          phone: '+91 98765 43211',
          email: 'aisha.khan@email.com',
          instagram: '@aishakhan_beauty'
        },
        portfolio: [
          { id: '3', image: '/api/placeholder/300/400', caption: 'Natural Beauty', category: 'natural', likes: 189 }
        ],
        isFavorited: false
      },
      {
        id: '3',
        name: 'Meera Patel',
        profilePicture: '/api/placeholder/80/80',
        location: 'Bangalore, Karnataka',
        rating: 4.7,
        reviewCount: 156,
        isVerified: true,
        blueTick: true,
        experience: '10+ years',
        specializations: ['bridal', 'party', 'skincare'],
        languages: ['English', 'Hindi', 'Kannada'],
        about: 'Senior makeup artist with extensive experience in bridal and party makeup. Also offers skincare consultations.',
        services: [
          { id: '6', name: 'Bridal Makeup', price: 22000, duration: '5-6 hours', description: 'Luxury bridal package', category: 'bridal' },
          { id: '7', name: 'Party Makeup', price: 3500, duration: '2.5 hours', description: 'Glam party look', category: 'party' },
          { id: '8', name: 'Skincare Consultation', price: 800, duration: '1 hour', description: 'Personalized skincare advice', category: 'skincare' }
        ],
        availability: {
          isOnline: false,
          nextAvailable: 'Monday, 11:00 AM',
          workingHours: '9:00 AM - 6:00 PM',
          responseTime: 'Usually responds in 4 hours'
        },
        contact: {
          phone: '+91 98765 43212',
          email: 'meera.patel@email.com',
          instagram: '@meerapatel_mua',
          website: 'www.meerapatel.com'
        },
        portfolio: [
          { id: '4', image: '/api/placeholder/300/400', caption: 'Bridal Elegance', category: 'bridal', likes: 312 },
          { id: '5', image: '/api/placeholder/300/400', caption: 'Party Glam', category: 'party', likes: 198 }
        ],
        isFavorited: false
      }
    ]

    setArtists(mockArtists)
    setFilteredArtists(mockArtists)
  }, [])

  useEffect(() => {
    let filtered = artists

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.specializations.some(spec => 
          specializations.find(s => s.id === spec)?.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Filter by specialization
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(artist => 
        artist.specializations.includes(selectedSpecialization)
      )
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(artist => 
        artist.location.toLowerCase().includes(selectedLocation)
      )
    }

    // Filter by price range
    filtered = filtered.filter(artist => {
      const minPrice = Math.min(...artist.services.map(s => s.price))
      return minPrice >= priceRange[0] && minPrice <= priceRange[1]
    })

    // Sort artists
    switch (sortBy) {
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case 'experience':
        filtered = [...filtered].sort((a, b) => parseInt(a.experience) - parseInt(b.experience))
        break
      case 'price-low':
        filtered = [...filtered].sort((a, b) => {
          const minPriceA = Math.min(...a.services.map(s => s.price))
          const minPriceB = Math.min(...b.services.map(s => s.price))
          return minPriceA - minPriceB
        })
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => {
          const minPriceA = Math.min(...a.services.map(s => s.price))
          const minPriceB = Math.min(...b.services.map(s => s.price))
          return minPriceB - minPriceA
        })
        break
      default:
        break
    }

    setFilteredArtists(filtered)
  }, [artists, searchQuery, selectedSpecialization, selectedLocation, sortBy, priceRange])

  const handleFavorite = (artistId: string) => {
    setArtists(prev => prev.map(artist =>
      artist.id === artistId
        ? { ...artist, isFavorited: !artist.isFavorited }
        : artist
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getSpecializationNames = (specIds: string[]) => {
    return specIds.map(id => 
      specializations.find(s => s.id === id)?.name
    ).filter(Boolean).join(', ')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Beauty Artists
          </h1>
          <p className="text-gray-600">
            Discover verified makeup artists and beauticians in your area
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search artists, specializations, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Specializations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {specializations.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name} ({spec.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Locations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₹)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Artists Grid */}
        <div className="space-y-6">
          {filteredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Artist Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={artist.profilePicture}
                      alt={artist.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{artist.name}</h3>
                        {artist.isVerified && (
                          <CheckBadgeIcon className="w-5 h-5 text-blue-500" />
                        )}
                        {artist.blueTick && (
                          <CheckBadgeIcon className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{artist.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span>{artist.rating}</span>
                          <span>({artist.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{artist.experience}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {artist.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                          >
                            {specializations.find(s => s.id === spec)?.name}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {artist.about}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <button
                      onClick={() => handleFavorite(artist.id)}
                      className={`p-2 rounded-full transition-colors ${
                        artist.isFavorited
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <HeartIconSolid className="w-6 h-6" />
                    </button>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      artist.availability.isOnline
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {artist.availability.isOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>

                {/* Services Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Services & Pricing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {artist.services.slice(0, 3).map((service) => (
                      <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">{service.name}</div>
                        <div className="text-lg font-bold text-primary-600 mb-1">
                          {formatPrice(service.price)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <ClockIcon className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    ))}
                  </div>
                  {artist.services.length > 3 && (
                    <button className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm">
                      View All {artist.services.length} Services
                    </button>
                  )}
                </div>

                {/* Portfolio Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Portfolio</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {artist.portfolio.slice(0, 4).map((item) => (
                      <div key={item.id} className="relative group">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">
                            {item.caption}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability & Contact */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      <span>Next available: {artist.availability.nextAvailable}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      <span>Response time: {artist.availability.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="btn-secondary">
                      View Profile
                    </button>
                    <button className="btn-primary">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredArtists.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Artists
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No artists found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}