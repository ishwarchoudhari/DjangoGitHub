'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  User, 
  Menu,
  ShoppingBag,
  MapPin,
  Heart
} from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    profilePicture?: string;
    isVerified?: boolean;
  } | null; // Will be typed properly when auth is implemented
}

const Header = ({ user }: HeaderProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                GlamHive
              </span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className={`relative w-full transition-all duration-200 ${
              isSearchFocused ? 'scale-105' : ''
            }`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search artists, services, products..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-20 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Location - Hidden on mobile */}
            <button className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Mumbai</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Messages */}
            <Link href="/messages" className="relative p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200">
                  <div className="instagram-avatar w-8 h-8">
                    <img
                      src={user.profilePicture || '/default-avatar.jpg'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {user.isVerified && (
                    <div className="verified-badge">
                      ✓
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="zomato-button-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search artists, services, products..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-20 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;