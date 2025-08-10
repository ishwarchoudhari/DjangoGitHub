import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Play,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Users,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with real API calls
const featuredArtists = [
  {
    id: '1',
    name: 'Priya Sharma',
    specialties: ['Bridal', 'Party'],
    rating: 4.9,
    totalReviews: 234,
    location: 'Bandra, Mumbai',
    profilePicture: '/api/placeholder/150/150',
    isVerified: true,
    isOnline: true,
    startingPrice: 1500,
    totalBookings: 567,
  },
  {
    id: '2',
    name: 'Asha Patel',
    specialties: ['Professional', 'Casual'],
    rating: 4.8,
    totalReviews: 189,
    location: 'Andheri, Mumbai',
    profilePicture: '/api/placeholder/150/150',
    isVerified: true,
    isOnline: false,
    startingPrice: 1200,
    totalBookings: 423,
  },
  {
    id: '3',
    name: 'Kavya Singh',
    specialties: ['Bridal', 'Special Occasion'],
    rating: 4.9,
    totalReviews: 312,
    location: 'Juhu, Mumbai',
    profilePicture: '/api/placeholder/150/150',
    isVerified: true,
    isOnline: true,
    startingPrice: 2000,
    totalBookings: 789,
  },
];

const popularServices = [
  {
    id: '1',
    name: 'Bridal Makeup',
    artist: 'Priya Sharma',
    price: 20000,
    originalPrice: 25000,
    duration: 180,
    rating: 4.9,
    image: '/api/placeholder/300/200',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Party Makeup',
    artist: 'Asha Patel',
    price: 3500,
    originalPrice: 4000,
    duration: 90,
    rating: 4.8,
    image: '/api/placeholder/300/200',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Professional Look',
    artist: 'Kavya Singh',
    price: 2500,
    originalPrice: 3000,
    duration: 60,
    rating: 4.7,
    image: '/api/placeholder/300/200',
    isPopular: false,
  },
];

const trendingProducts = [
  {
    id: '1',
    name: 'Rare Beauty Blush',
    brand: 'Rare Beauty',
    price: 1899,
    originalPrice: 2199,
    rating: 4.6,
    image: '/api/placeholder/200/200',
    isAffiliate: false,
  },
  {
    id: '2',
    name: 'Charlotte Tilbury Foundation',
    brand: 'Charlotte Tilbury',
    price: 3499,
    originalPrice: 3999,
    rating: 4.8,
    image: '/api/placeholder/200/200',
    isAffiliate: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Beauty,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-yellow-200">
                Our Passion
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-2xl mx-auto">
              Book verified makeup artists, shop premium cosmetics, and discover beauty tutorials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/artists"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-pink-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Book an Artist
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Verified Artists</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-pink-600">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600">1000+</div>
              <div className="text-gray-600">Premium Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Artists</h2>
              <p className="text-gray-600">Top-rated makeup artists in your area</p>
            </div>
            <Link
              href="/artists"
              className="hidden sm:inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              View All
              <TrendingUp className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtists.map((artist) => (
              <div key={artist.id} className="instagram-card group cursor-pointer">
                <div className="relative">
                  <img
                    src={artist.profilePicture}
                    alt={artist.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
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
                    {artist.isVerified && (
                      <div className="verified-badge">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                        {artist.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{artist.rating}</span>
                      <span className="text-sm text-gray-500">({artist.totalReviews})</span>
                    </div>
                  </div>
                  
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
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting at</span>
                      <div className="text-lg font-bold text-gray-900">₹{artist.startingPrice.toLocaleString()}</div>
                    </div>
                    <button className="zomato-button-primary text-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Services</h2>
              <p className="text-gray-600">Most booked beauty services this week</p>
            </div>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              View All
              <TrendingUp className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <div key={service.id} className="zomato-card group cursor-pointer">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  {service.isPopular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-pink-600 transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">by {service.artist}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{service.price.toLocaleString()}</span>
                      {service.originalPrice > service.price && (
                        <span className="text-sm text-gray-500 line-through">₹{service.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration} minutes
                  </div>
                  
                  <button className="w-full zomato-button-primary">
                    Book Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Products</h2>
              <p className="text-gray-600">Handpicked cosmetics from top brands</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              Shop All
              <ShoppingBag className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <div key={product.id} className="instagram-card group cursor-pointer">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  {product.isAffiliate && (
                    <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Affiliate
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  
                  <button className="w-full zomato-button-primary text-sm py-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
}
