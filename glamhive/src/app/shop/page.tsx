'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Search, 
  Filter, 
  Star, 
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  Grid3X3,
  List,
  TrendingUp,
  Award,
  Percent,
  Truck,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// Mock data for products
const products = [
  {
    id: '1',
    name: 'Rare Beauty Liquid Blush',
    brand: 'Rare Beauty',
    price: 1899,
    originalPrice: 2199,
    rating: 4.6,
    totalReviews: 234,
    image: '/api/placeholder/300/300',
    category: 'MAKEUP',
    subCategory: 'Face',
    isAffiliate: false,
    inStock: true,
    stockQuantity: 15,
    isPopular: true,
    discount: 14,
    tags: ['trending', 'bestseller'],
    description: 'Long-lasting liquid blush for a natural flush.',
  },
  {
    id: '2',
    name: 'Charlotte Tilbury Magic Foundation',
    brand: 'Charlotte Tilbury',
    price: 3499,
    originalPrice: 3999,
    rating: 4.8,
    totalReviews: 567,
    image: '/api/placeholder/300/300',
    category: 'MAKEUP',
    subCategory: 'Face',
    isAffiliate: true,
    inStock: true,
    stockQuantity: 8,
    isPopular: true,
    discount: 13,
    tags: ['premium', 'bestseller'],
    description: 'Full coverage foundation with 16-hour wear.',
  },
  {
    id: '3',
    name: 'The Ordinary Hyaluronic Acid Serum',
    brand: 'The Ordinary',
    price: 699,
    originalPrice: 799,
    rating: 4.4,
    totalReviews: 1234,
    image: '/api/placeholder/300/300',
    category: 'SKINCARE',
    subCategory: 'Serums',
    isAffiliate: false,
    inStock: true,
    stockQuantity: 50,
    isPopular: true,
    discount: 13,
    tags: ['affordable', 'hydrating'],
    description: 'Intense hydration serum for all skin types.',
  },
  {
    id: '4',
    name: 'Dyson Supersonic Hair Dryer',
    brand: 'Dyson',
    price: 34900,
    originalPrice: 37900,
    rating: 4.9,
    totalReviews: 156,
    image: '/api/placeholder/300/300',
    category: 'TOOLS',
    subCategory: 'Hair Tools',
    isAffiliate: true,
    inStock: true,
    stockQuantity: 3,
    isPopular: false,
    discount: 8,
    tags: ['premium', 'technology'],
    description: 'Professional hair dryer with intelligent heat control.',
  },
  {
    id: '5',
    name: 'Fenty Beauty Gloss Bomb',
    brand: 'Fenty Beauty',
    price: 1599,
    originalPrice: 1799,
    rating: 4.5,
    totalReviews: 345,
    image: '/api/placeholder/300/300',
    category: 'MAKEUP',
    subCategory: 'Lips',
    isAffiliate: false,
    inStock: false,
    stockQuantity: 0,
    isPopular: true,
    discount: 11,
    tags: ['viral', 'glossy'],
    description: 'Universal lip luminizer with explosive shine.',
  },
  {
    id: '6',
    name: 'Drunk Elephant Vitamin C Serum',
    brand: 'Drunk Elephant',
    price: 2699,
    originalPrice: 2999,
    rating: 4.7,
    totalReviews: 189,
    image: '/api/placeholder/300/300',
    category: 'SKINCARE',
    subCategory: 'Serums',
    isAffiliate: false,
    inStock: true,
    stockQuantity: 12,
    isPopular: false,
    discount: 10,
    tags: ['antioxidant', 'brightening'],
    description: 'Potent vitamin C serum for brighter, firmer skin.',
  },
];

const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'MAKEUP', name: 'Makeup', icon: '💄' },
  { id: 'SKINCARE', name: 'Skincare', icon: '🧴' },
  { id: 'HAIRCARE', name: 'Haircare', icon: '🧴' },
  { id: 'FRAGRANCE', name: 'Fragrance', icon: '🌸' },
  { id: 'TOOLS', name: 'Tools', icon: '🔧' },
  { id: 'ACCESSORIES', name: 'Accessories', icon: '✨' },
];

const brands = ['All Brands', 'Rare Beauty', 'Charlotte Tilbury', 'The Ordinary', 'Fenty Beauty', 'Drunk Elephant', 'Dyson'];
const sortOptions = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Discount', value: 'discount' },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState([0, 40000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = !showInStockOnly || product.inStock;
    const matchesDiscount = !showDiscountedOnly || product.discount > 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && 
           matchesStock && matchesDiscount;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'discount':
        return b.discount - a.discount;
      case 'newest':
        return 0; // Would sort by creation date in real app
      default: // popular
        return b.totalReviews - a.totalReviews;
    }
  });

  const addToCart = (productId: string) => {
    // Handle add to cart logic
    console.log('Added to cart:', productId);
  };

  const toggleWishlist = (productId: string) => {
    // Handle wishlist toggle
    console.log('Toggled wishlist:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Beauty Shop</h1>
              <p className="text-gray-600 mt-1">Discover premium cosmetics and beauty products</p>
            </div>
            <div className="text-sm text-gray-500">
              {sortedProducts.length} products found
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
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
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
              placeholder="Search products, brands..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span>In stock only</span>
                </label>
              </div>
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
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
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
                      max="40000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Offers</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={showDiscountedOnly}
                        onChange={(e) => setShowDiscountedOnly(e.target.checked)}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span>On sale only</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="space-y-2">
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-pink-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.5 & above</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="zomato-card group cursor-pointer h-full">
                <div className="relative">
                  <Link href={`/shop/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.discount > 0 && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                        <Percent className="h-3 w-3 mr-1" />
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.isPopular && (
                      <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </div>
                    )}
                    {product.isAffiliate && (
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Affiliate
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <Link href={`/shop/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  </Link>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.totalReviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>

                  {product.stockQuantity <= 5 && product.inStock && (
                    <p className="text-red-600 text-xs mb-2">Only {product.stockQuantity} left!</p>
                  )}
                  
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                      product.inStock
                        ? 'zomato-button-primary'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? (
                      <div className="flex items-center justify-center space-x-1">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </div>
                    ) : (
                      'Out of Stock'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <div key={product.id} className="zomato-card p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <Link href={`/shop/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>
                    
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link href={`/shop/product/${product.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{product.brand}</p>
                        </Link>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                            <span>({product.totalReviews} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Truck className="h-4 w-4" />
                            <span>Free delivery</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-4 ml-6">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
                        >
                          <Heart className="h-5 w-5" />
                        </button>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          {product.stockQuantity <= 5 && product.inStock && (
                            <p className="text-red-600 text-xs mb-2">Only {product.stockQuantity} left!</p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            product.inStock
                              ? 'zomato-button-primary'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}