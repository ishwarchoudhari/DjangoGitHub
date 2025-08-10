'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  MoreVertical,
  Search,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle,
  Filter,
  Grid3X3,
  Rows
} from 'lucide-react';
import Link from 'next/link';

// Mock data for videos
const videos = [
  {
    id: '1',
    title: 'Perfect Bridal Makeup Tutorial | Step by Step',
    description: 'Learn how to create the perfect bridal look with this detailed tutorial. Covering base, eyes, and lips.',
    thumbnail: '/api/placeholder/400/600',
    duration: '12:34',
    views: 45000,
    likes: 2300,
    comments: 156,
    uploadedAt: '2 hours ago',
    artist: {
      id: '1',
      name: 'Priya Sharma',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      followers: 125000,
    },
    category: 'Tutorial',
    tags: ['bridal', 'makeup', 'tutorial', 'wedding'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    title: 'Everyday Natural Makeup | 5 Minute Look',
    description: 'Quick and easy everyday makeup look that takes just 5 minutes to complete.',
    thumbnail: '/api/placeholder/400/600',
    duration: '5:22',
    views: 78000,
    likes: 4200,
    comments: 234,
    uploadedAt: '1 day ago',
    artist: {
      id: '2',
      name: 'Asha Patel',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      followers: 89000,
    },
    category: 'Tutorial',
    tags: ['natural', 'everyday', 'quick', 'beginner'],
    isLiked: true,
    isSaved: false,
  },
  {
    id: '3',
    title: 'Smoky Eye Makeup | Evening Look',
    description: 'Create a stunning smoky eye perfect for evening events and parties.',
    thumbnail: '/api/placeholder/400/600',
    duration: '8:45',
    views: 92000,
    likes: 5100,
    comments: 312,
    uploadedAt: '3 days ago',
    artist: {
      id: '3',
      name: 'Kavya Singh',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      followers: 156000,
    },
    category: 'Tutorial',
    tags: ['smoky', 'evening', 'party', 'dramatic'],
    isLiked: false,
    isSaved: true,
  },
  {
    id: '4',
    title: 'Product Review: Charlotte Tilbury Foundation',
    description: 'Honest review of the Magic Foundation - worth the hype?',
    thumbnail: '/api/placeholder/400/600',
    duration: '6:18',
    views: 34000,
    likes: 1800,
    comments: 89,
    uploadedAt: '5 days ago',
    artist: {
      id: '4',
      name: 'Reena Kapoor',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      followers: 67000,
    },
    category: 'Review',
    tags: ['review', 'foundation', 'charlotte tilbury'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '5',
    title: 'Behind the Scenes: Photoshoot Makeup',
    description: 'Take a look behind the scenes of a professional photoshoot.',
    thumbnail: '/api/placeholder/400/600',
    duration: '15:22',
    views: 23000,
    likes: 1200,
    comments: 67,
    uploadedAt: '1 week ago',
    artist: {
      id: '5',
      name: 'Sneha Gupta',
      profilePicture: '/api/placeholder/100/100',
      isVerified: false,
      followers: 34000,
    },
    category: 'Behind the Scenes',
    tags: ['bts', 'photoshoot', 'professional'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '6',
    title: 'Skincare Routine for Glowing Skin',
    description: 'My complete skincare routine for achieving that perfect glow.',
    thumbnail: '/api/placeholder/400/600',
    duration: '9:33',
    views: 67000,
    likes: 3400,
    comments: 198,
    uploadedAt: '1 week ago',
    artist: {
      id: '1',
      name: 'Priya Sharma',
      profilePicture: '/api/placeholder/100/100',
      isVerified: true,
      followers: 125000,
    },
    category: 'Skincare',
    tags: ['skincare', 'glowing', 'routine', 'healthy'],
    isLiked: true,
    isSaved: true,
  },
];

const categories = ['All', 'Tutorial', 'Review', 'Behind the Scenes', 'Skincare', 'Hairstyling', 'Trending'];
const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Most Liked', value: 'likes' },
  { label: 'Most Viewed', value: 'views' },
];

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      case 'views':
        return b.views - a.views;
      default: // latest
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    }
  });

  const toggleLike = (videoId: string) => {
    console.log('Toggled like for video:', videoId);
  };

  const toggleSave = (videoId: string) => {
    console.log('Toggled save for video:', videoId);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Beauty Videos</h1>
              <p className="text-gray-600 mt-1">Discover tutorials, reviews, and beauty content</p>
            </div>
            <div className="text-sm text-gray-500">
              {sortedVideos.length} videos available
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
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
              placeholder="Search videos, tutorials, reviews..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Rows className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedVideos.map((video) => (
              <div key={video.id} className="instagram-card group cursor-pointer h-full">
                {/* Video Thumbnail */}
                <div className="relative">
                  <Link href={`/videos/${video.id}`}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </Link>
                  
                  {/* Save Button */}
                  <button
                    onClick={() => toggleSave(video.id)}
                    className="absolute top-2 right-2 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
                  >
                    <Bookmark className={`h-4 w-4 ${video.isSaved ? 'text-yellow-400 fill-current' : 'text-white'}`} />
                  </button>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  {/* Artist Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Link href={`/artists/${video.artist.id}`}>
                      <div className="instagram-avatar w-10 h-10">
                        <img
                          src={video.artist.profilePicture}
                          alt={video.artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/artists/${video.artist.id}`}>
                        <div className="flex items-center space-x-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate hover:text-pink-600 transition-colors">
                            {video.artist.name}
                          </h4>
                          {video.artist.isVerified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{formatFollowers(video.artist.followers)} followers</p>
                      </Link>
                    </div>
                  </div>

                  {/* Video Details */}
                  <Link href={`/videos/${video.id}`}>
                    <h3 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatViews(video.views)} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.uploadedAt}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                      {video.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(video.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <Heart className={`h-4 w-4 ${video.isLiked ? 'text-pink-600 fill-current' : ''}`} />
                        <span className="text-xs">{video.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{video.comments}</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-6">
            {sortedVideos.map((video) => (
              <div key={video.id} className="instagram-card p-6">
                <div className="flex items-start space-x-6">
                  {/* Video Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <Link href={`/videos/${video.id}`}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-800 ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                    </Link>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link href={`/videos/${video.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors mb-2">
                            {video.title}
                          </h3>
                        </Link>

                        {/* Artist Info */}
                        <div className="flex items-center space-x-2 mb-3">
                          <Link href={`/artists/${video.artist.id}`}>
                            <div className="instagram-avatar w-8 h-8">
                              <img
                                src={video.artist.profilePicture}
                                alt={video.artist.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                          <Link href={`/artists/${video.artist.id}`}>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors">
                                {video.artist.name}
                              </span>
                              {video.artist.isVerified && (
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                          </Link>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{formatViews(video.views)} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{video.uploadedAt}</span>
                          </div>
                          <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                            {video.category}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {video.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end space-y-4 ml-6">
                        <button
                          onClick={() => toggleSave(video.id)}
                          className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                          <Bookmark className={`h-5 w-5 ${video.isSaved ? 'text-yellow-500 fill-current' : ''}`} />
                        </button>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => toggleLike(video.id)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors"
                          >
                            <Heart className={`h-5 w-5 ${video.isLiked ? 'text-pink-600 fill-current' : ''}`} />
                            <span className="text-sm">{video.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm">{video.comments}</span>
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                            <Share className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Play className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or category filters.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}