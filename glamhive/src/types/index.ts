export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  dateOfBirth?: Date;
  location?: string;
  instagramLink?: string;
  profilePicture?: string;
  role: 'USER' | 'ARTIST';
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Artist extends User {
  role: 'ARTIST';
  isVerified: boolean;
  verificationDocuments?: string[];
  bio?: string;
  experience?: number;
  specialties?: string[];
  isOnline: boolean;
  availabilityStatus: 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'UNAVAILABLE';
  rating: number;
  totalReviews: number;
  totalBookings: number;
}

export interface Service {
  id: string;
  artistId: string;
  artist?: Artist;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'BRIDAL' | 'CASUAL' | 'PARTY' | 'PROFESSIONAL' | 'SPECIAL_OCCASION';
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  user?: User;
  artistId: string;
  artist?: Artist;
  serviceId: string;
  service?: Service;
  scheduledDate: Date;
  scheduledTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  totalAmount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  paymentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  artistId?: string; // If sold by artist
  artist?: Artist;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'MAKEUP' | 'SKINCARE' | 'HAIRCARE' | 'FRAGRANCE' | 'TOOLS' | 'ACCESSORIES';
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  isAffiliate: boolean;
  affiliateLink?: string;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  user?: User;
  targetId: string; // Artist ID or Product ID
  targetType: 'ARTIST' | 'PRODUCT';
  rating: number;
  comment: string;
  images?: string[];
  isReported: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  sender?: User;
  receiverId: string;
  receiver?: User;
  bookingId?: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'BOOKING_UPDATE';
  isRead: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface Post {
  id: string;
  artistId: string;
  artist?: Artist;
  content: string;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';
  hashtags?: string[];
  likes: number;
  comments: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Availability {
  id: string;
  artistId: string;
  date: Date;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookingId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'MESSAGE' | 'REVIEW' | 'GENERAL';
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  product?: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
  provider?: 'GOOGLE' | 'EMAIL' | 'PHONE';
}

export interface SearchFilters {
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: Date;
  category?: string;
  sortBy?: 'RATING' | 'PRICE_LOW' | 'PRICE_HIGH' | 'POPULAR' | 'NEWEST';
}