'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  BookmarkIcon,
  StarIcon,
  MapPinIcon,
  CheckBadgeIcon,
  PlayIcon
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
  services: Service[]
  posts: Post[]
}

interface Service {
  id: string
  name: string
  price: number
  duration: string
}

interface Post {
  id: string
  image: string
  caption: string
  likes: number
  comments: number
  isVideo: boolean
  thumbnail?: string
}

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        profilePicture: '/api/placeholder/40/40',
        location: 'Mumbai, Maharashtra',
        rating: 4.8,
        reviewCount: 127,
        isVerified: true,
        blueTick: true,
        services: [
          { id: '1', name: 'Bridal Makeup', price: 20000, duration: '4-5 hours' },
          { id: '2', name: 'Party Makeup', price: 3000, duration: '2 hours' },
          { id: '3', name: 'Natural Makeup', price: 1500, duration: '1.5 hours' }
        ],
        posts: [
          {
            id: '1',
            image: '/api/placeholder/400/500',
            caption: 'Bridal glamour ✨ Perfect blend of traditional and modern makeup for the special day! #BridalMakeup #GlamHive',
            likes: 234,
            comments: 18,
            isVideo: false
          },
          {
            id: '2',
            image: '/api/placeholder/400/500',
            caption: 'Party ready! 💃 Smokey eyes and nude lips for the perfect party look #PartyMakeup #Beauty',
            likes: 156,
            comments: 12,
            isVideo: false
          }
        ]
      },
      {
        id: '2',
        name: 'Aisha Khan',
        profilePicture: '/api/placeholder/40/40',
        location: 'Delhi, NCR',
        rating: 4.9,
        reviewCount: 89,
        isVerified: true,
        blueTick: false,
        services: [
          { id: '4', name: 'Bridal Makeup', price: 25000, duration: '5-6 hours' },
          { id: '5', name: 'Hair Styling', price: 2000, duration: '1 hour' }
        ],
        posts: [
          {
            id: '3',
            image: '/api/placeholder/400/500',
            caption: 'Natural beauty enhanced 🌸 Soft glam for everyday elegance #NaturalMakeup #BeautyTips',
            likes: 189,
            comments: 15,
            isVideo: false
          }
        ]
      }
    ]
    
    setArtists(mockArtists)
  }, [])

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Discover amazing beauty artists and stay updated with the latest trends
          </p>
        </motion.div>

        {/* Artists Feed */}
        <div className="space-y-8">
          {artists.map((artist, artistIndex) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: artistIndex * 0.1 }}
              className="card"
            >
              {/* Artist Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={artist.profilePicture}
                      alt={artist.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                        {artist.isVerified && (
                          <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                        )}
                        {artist.blueTick && (
                          <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{artist.location}</span>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span>{artist.rating}</span>
                          <span>({artist.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Services Preview */}
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Services & Pricing</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {artist.services.map((service) => (
                    <div key={service.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-lg font-bold text-primary-600">
                        {formatPrice(service.price)}
                      </div>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View All Services
                </button>
              </div>

              {/* Posts */}
              <div className="space-y-4">
                {artist.posts.map((post) => (
                  <div key={post.id} className="p-4">
                    {/* Post Image */}
                    <div className="relative mb-3">
                      {post.isVideo ? (
                        <div className="relative">
                          <img
                            src={post.thumbnail || post.image}
                            alt={post.caption}
                            className="w-full h-96 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-4">
                              <PlayIcon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={post.image}
                          alt={post.caption}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          {likedPosts.has(post.id) ? (
                            <HeartIconSolid className="w-6 h-6 text-red-500" />
                          ) : (
                            <HeartIcon className="w-6 h-6" />
                          )}
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                          <ChatBubbleLeftIcon className="w-6 h-6" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleSave(post.id)}
                        className={`transition-colors ${
                          savedPosts.has(post.id)
                            ? 'text-yellow-500'
                            : 'text-gray-600 hover:text-yellow-500'
                        }`}
                      >
                        <BookmarkIcon className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Post Caption */}
                    <div className="text-gray-900">
                      <span className="font-medium">{artist.name}</span>
                      <span className="ml-2">{post.caption}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <div className="p-4 border-t border-gray-100">
                <button className="w-full btn-primary">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="btn-secondary">
            Load More Artists
          </button>
        </div>
      </div>
    </div>
  )
}