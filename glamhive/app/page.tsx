'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  UserGroupIcon, 
  ShoppingBagIcon, 
  CalendarIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('services')

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Verified Artists',
      description: 'Connect with certified makeup artists and beauty professionals'
    },
    {
      icon: ShoppingBagIcon,
      title: 'Premium Cosmetics',
      description: 'Shop authentic beauty products from top brands and artists'
    },
    {
      icon: CalendarIcon,
      title: 'Easy Booking',
      description: 'Book appointments instantly with real-time availability'
    },
    {
      icon: StarIcon,
      title: 'Trusted Reviews',
      description: 'Read genuine reviews from satisfied customers'
    }
  ]

  const stats = [
    { number: '500+', label: 'Makeup Artists' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Beauty Products' },
    { number: '4.8★', label: 'Average Rating' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Discover Your Beauty
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  GlamHive
                </span>
                <br />
                <span className="text-gray-800">Beauty Marketplace</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Book verified makeup artists, shop premium cosmetics, and discover the latest beauty trends. 
                Your one-stop destination for all things beauty.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup" className="btn-primary">
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/explore" className="btn-secondary">
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Beauty
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From professional makeup services to premium cosmetics, we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 beauty-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Beauty Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of satisfied customers who trust GlamHive for their beauty needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Sign Up Now
              </Link>
              <Link href="/about" className="text-white border-2 border-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}