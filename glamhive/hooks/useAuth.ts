'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  userType: 'customer' | 'artist'
  profilePicture?: string
  dateOfBirth: string
  location: string
  instagramLink?: string
  isVerified: boolean
  blueTick?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (userData: Partial<User> & { password: string }) => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app load
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Check localStorage or cookies for existing session
      const token = localStorage.getItem('glamhive_token')
      if (token) {
        // TODO: Validate token with backend
        // For now, simulate a logged-in user
        const mockUser: User = {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '9876543210',
          userType: 'customer',
          profilePicture: '/api/placeholder/40/40',
          dateOfBirth: '1995-03-15',
          location: 'Mumbai, Maharashtra',
          isVerified: true
        }
        setUser(mockUser)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Sarah Johnson',
        email: email,
        phone: '9876543210',
        userType: 'customer',
        profilePicture: '/api/placeholder/40/40',
        dateOfBirth: '1995-03-15',
        location: 'Mumbai, Maharashtra',
        isVerified: true
      }
      
      setUser(mockUser)
      localStorage.setItem('glamhive_token', 'mock_token_123')
      
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual signup API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
      
      // Mock successful signup
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        userType: userData.userType || 'customer',
        dateOfBirth: userData.dateOfBirth || '',
        location: userData.location || '',
        instagramLink: userData.instagramLink,
        isVerified: false,
        blueTick: userData.userType === 'artist' ? false : undefined
      }
      
      setUser(newUser)
      localStorage.setItem('glamhive_token', 'mock_token_123')
      
    } catch (error) {
      throw new Error('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('glamhive_token')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}