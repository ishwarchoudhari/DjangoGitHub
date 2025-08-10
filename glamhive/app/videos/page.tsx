'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlayIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Navigation from '@/components/layout/Navigation'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: string
  views: number
  likes: number
  comments: number
  category: string
  tags: string[]
  artist: Artist
  isLiked: boolean
  isSaved: boolean
  isVideo: boolean
  createdAt: string
}

interface Artist {
  id: string
  name: string
  profilePicture: string
  isVerified: boolean
  blueTick: boolean
  followers: number
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'all', name: 'All Videos', count: 0 },
    { id: 'tutorials', name: 'Makeup Tutorials', count: 45 },
    { id: 'bridal', name: 'Bridal Looks', count: 32 },
    { id: 'party', name: 'Party Makeup', count: 28 },
    { id: 'skincare', name: 'Skincare Tips', count: 25 },
    { id: 'hair', name: 'Hair Styling', count: 22 },
    { id: 'reviews', name: 'Product Reviews', count: 18 },
    { id: 'trends', name: 'Beauty Trends', count: 15 }
  ]

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockVideos: Video[] = [
      {
        id: '1',
        title: 'Complete Bridal Makeup Tutorial',
        description: 'Step-by-step bridal makeup tutorial for the perfect wedding day look. Learn professional techniques for long-lasting makeup.',
        thumbnail: '/api/placeholder/400/500',
        videoUrl: '/api/video/1',
        duration: '15:32',
        views: 15420,
        likes: 892,
        comments: 156,
        category: 'bridal',
        tags: ['Bridal Makeup', 'Wedding', 'Professional', 'Long-lasting'],
        artist: {
          id: '1',
          name: 'Priya Sharma',
          profilePicture: '/api/placeholder/40/40',
          isVerified: true,
          blueTick: true,
          followers: 12500
        },
        isLiked: false,
        isSaved: false,
        isVideo: true,
        createdAt: '2 days ago'
      },
      {
        id: '2',
        title: 'Natural Everyday Makeup in 5 Minutes',
        description: 'Quick and easy natural makeup look perfect for daily wear. Minimal products, maximum impact!',
        thumbnail: '/api/placeholder/400/500',
        videoUrl: '/api/video/2',
        duration: '5:18',
        views: 8920,
        likes: 567,
        comments: 89,
        category: 'tutorials',
        tags: ['Natural Makeup', 'Quick', 'Daily', 'Minimal'],
        artist: {
          id: '2',
          name: 'Aisha Khan',
          profilePicture: '/api/placeholder/40/40',
          isVerified: true,
          blueTick: false,
          followers: 8900
        },
        isLiked: false,
        isSaved: false,
        isVideo: true,
        createdAt: '1 day ago'
      },
      {
        id: '3',
        title: 'Skincare Routine for Acne-Prone Skin',
        description: 'Complete skincare routine to combat acne and achieve clear, glowing skin. Dermatologist-approved methods.',
        thumbnail: '/api/placeholder/400/500',
        videoUrl: '/api/video/3',
        duration: '12:45',
        views: 12340,
        likes: 734,
        comments: 123,
        category: 'skincare',
        tags: ['Skincare', 'Acne', 'Clear Skin', 'Dermatologist'],
        artist: {
          id: '3',
          name: 'Meera Patel',
          profilePicture: '/api/placeholder/40/40',
          isVerified: true,
          blueTick: true,
          followers: 15600
        },
        isLiked: false,
        isSaved: false,
        isVideo: true,
        createdAt: '3 days ago'
      },
      {
        id: '4',
        title: 'Glamorous Party Makeup Look',
        description: 'Stunning party makeup with glitter and bold colors. Perfect for special occasions and celebrations.',
        thumbnail: '/api/placeholder/400/500',
        videoUrl: '/api/video/4',
        duration: '18:22',
        views: 9870,
        likes: 623,
        comments: 98,
        category: 'party',
        tags: ['Party Makeup', 'Glamorous', 'Glitter', 'Bold Colors'],
        artist: {
          id: '1',
          name: 'Priya Sharma',
          profilePicture: '/api/placeholder/40/40',
          isVerified: true,
          blueTick: true,
          followers: 12500
        },
        isLiked: false,
        isSaved: false,
        isVideo: true,
        createdAt: '4 days ago'
      },
      {
        id: '5',
        title: 'Hair Styling: Beach Waves Tutorial',
        description: 'Create perfect beach waves at home with simple tools. No expensive equipment needed!',
        thumbnail: '/api/placeholder/400/500',
        videoUrl: '/api/video/5',
        duration: '8:15',
        views: 7650,
        likes: 445,
        comments: 67,
        category: 'hair',
        tags: ['Hair Styling', 'Beach Waves', 'Home Tutorial', 'Easy'],
        artist: {
          id: '2',
          name: 'Aisha Khan',
          profilePicture: '/api/placeholder/40/40',
          isVerified: true,
          blueTick: false,
          followers: 8900
        },
        isLiked: false,
        isSaved: false,
        isVideo: true,
        createdAt: '5 days ago'
      },
      {
        id: '6',
        title: 'Lakme Foundation Review & Swatches',
        description: 'Honest review of Lakme Absolute Skin Gloss Gel Creme foundation. Real swatches and wear test.',
        thumbnail: '/api/placeholder/400/500',
        videoUrl: '/api/video/6',
        duration: '10:30',
        views: 11200,
        likes: 678,
        comments: 134,
        category: 'reviews',
        tags: ['Product Review', 'Foundation', 'Lakme', 'Swatches'],
        artist: {
          id: '3',
          name: 'Meera Patel',
          profilePicture: '/api/placeholder/40/40',
          isVerified: true,
          blueTick: true,
          followers: 15600
        },
        isLiked: false,
        isSaved: false,
        isVideo: true,
        createdAt: '1 week ago'
      }
    ]

    setVideos(mockVideos)
    setFilteredVideos(mockVideos)
  }, [])

  useEffect(() => {
    let filtered = videos

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        video.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory)
    }

    // Sort videos
    switch (sortBy) {
      case 'trending':
        filtered = [...filtered].sort((a, b) => b.views - a.views)
        break
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'most-liked':
        filtered = [...filtered].sort((a, b) => b.likes - a.likes)
        break
      case 'most-commented':
        filtered = [...filtered].sort((a, b) => b.comments - a.comments)
        break
      default:
        break
    }

    setFilteredVideos(filtered)
  }, [videos, searchQuery, selectedCategory, sortBy])

  const handleLike = (videoId: string) => {
    setVideos(prev => prev.map(video =>
      video.id === videoId
        ? { ...video, isLiked: !video.isLiked, likes: video.isLiked ? video.likes - 1 : video.likes + 1 }
        : video
    ))
  }

  const handleSave = (videoId: string) => {
    setVideos(prev => prev.map(video =>
      video.id === videoId
        ? { ...video, isSaved: !video.isSaved }
        : video
    ))
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatDuration = (duration: string) => {
    return duration
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
            Beauty Videos
          </h1>
          <p className="text-gray-600">
            Watch tutorials, tips, and beauty inspiration from top artists
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
                  placeholder="Search videos, tutorials, artists..."
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
                <option value="trending">Trending</option>
                <option value="newest">Newest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-commented">Most Commented</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Categories</span>
            </button>
          </div>

          {/* Categories */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:shadow-lg transition-shadow"
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-4 group-hover:bg-primary-600 transition-colors">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  {formatDuration(video.duration)}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {categories.find(c => c.id === video.category)?.name}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                {/* Artist Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={video.artist.profilePicture}
                    alt={video.artist.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-gray-900">{video.artist.name}</span>
                      {video.artist.isVerified && (
                        <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                      )}
                      {video.artist.blueTick && (
                        <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatViews(video.artist.followers)} followers
                    </div>
                  </div>
                </div>

                {/* Video Title & Description */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Video Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{formatViews(video.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{video.createdAt}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(video.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      {video.isLiked ? (
                        <HeartIconSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span className="text-sm">{formatViews(video.likes)}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span className="text-sm">{formatViews(video.comments)}</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSave(video.id)}
                      className={`p-2 rounded-full transition-colors ${
                        video.isSaved
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <BookmarkIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredVideos.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Videos
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No videos found
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