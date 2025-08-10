'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Navigation from '@/components/layout/Navigation'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  isInStock: boolean
  isWishlisted: boolean
  discount?: number
  tags: string[]
}

export default function CosmeticsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [cart, setCart] = useState<Set<string>>(new Set())

  const categories = [
    { id: 'all', name: 'All Products', count: 0 },
    { id: 'makeup', name: 'Makeup', count: 45 },
    { id: 'skincare', name: 'Skincare', count: 32 },
    { id: 'haircare', name: 'Hair Care', count: 28 },
    { id: 'fragrances', name: 'Fragrances', count: 15 },
    { id: 'tools', name: 'Beauty Tools', count: 20 }
  ]

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Lakme Absolute Skin Gloss Gel Creme',
        brand: 'Lakme',
        price: 599,
        originalPrice: 799,
        image: '/api/placeholder/300/300',
        rating: 4.5,
        reviewCount: 234,
        category: 'skincare',
        isInStock: true,
        isWishlisted: false,
        discount: 25,
        tags: ['Best Seller', 'New Launch']
      },
      {
        id: '2',
        name: 'Maybelline New York Super Stay Matte Ink Liquid Lipstick',
        brand: 'Maybelline',
        price: 699,
        image: '/api/placeholder/300/300',
        rating: 4.7,
        reviewCount: 189,
        category: 'makeup',
        isInStock: true,
        isWishlisted: false,
        tags: ['Long Lasting', 'Matte Finish']
      },
      {
        id: '3',
        name: 'L\'Oreal Paris Revitalift Filler Anti-Ageing Day Cream',
        brand: 'L\'Oreal Paris',
        price: 1299,
        originalPrice: 1599,
        image: '/api/placeholder/300/300',
        rating: 4.3,
        reviewCount: 156,
        category: 'skincare',
        isInStock: true,
        isWishlisted: false,
        discount: 19,
        tags: ['Anti-Ageing', 'Best Seller']
      },
      {
        id: '4',
        name: 'Nykaa Naturals Face Wash',
        brand: 'Nykaa Naturals',
        price: 299,
        image: '/api/placeholder/300/300',
        rating: 4.2,
        reviewCount: 89,
        category: 'skincare',
        isInStock: false,
        isWishlisted: false,
        tags: ['Natural', 'Organic']
      },
      {
        id: '5',
        name: 'Sugar Cosmetics Ace Of Face Foundation Stick',
        brand: 'Sugar Cosmetics',
        price: 899,
        originalPrice: 1099,
        image: '/api/placeholder/300/300',
        rating: 4.6,
        reviewCount: 203,
        category: 'makeup',
        isInStock: true,
        isWishlisted: false,
        discount: 18,
        tags: ['Long Lasting', 'Full Coverage']
      },
      {
        id: '6',
        name: 'Tresemme Pro Protect Heat Protect Spray',
        brand: 'Tresemme',
        price: 399,
        image: '/api/placeholder/300/300',
        rating: 4.4,
        reviewCount: 167,
        category: 'haircare',
        isInStock: true,
        isWishlisted: false,
        tags: ['Heat Protection', 'Professional']
      }
    ]
    
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        // popularity - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy])

  const handleWishlist = (productId: string) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, isWishlisted: !product.isWishlisted }
        : product
    ))
  }

  const handleAddToCart = (productId: string) => {
    setCart(prev => {
      const newCart = new Set(prev)
      if (newCart.has(productId)) {
        newCart.delete(productId)
      } else {
        newCart.add(productId)
      }
      return newCart
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
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Beauty Cosmetics
          </h1>
          <p className="text-gray-600">
            Discover premium beauty products from top brands
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
                  placeholder="Search for products, brands..."
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
                <option value="popularity">Sort by Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                
                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {product.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    -{product.discount}%
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleWishlist(product.id)}
                    className={`p-2 rounded-full shadow-lg ${
                      product.isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:text-red-500'
                    }`}
                  >
                    {product.isWishlisted ? (
                      <HeartIconSolid className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button className="p-2 rounded-full bg-white text-gray-600 hover:text-primary-600 shadow-lg">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Out of Stock Overlay */}
                {!product.isInStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-xl">
                    <span className="text-white font-medium text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.isInStock}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    product.isInStock
                      ? cart.has(product.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>
                    {cart.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Products
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
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