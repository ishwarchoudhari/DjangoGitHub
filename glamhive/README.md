# GlamHive - Beauty Services & Cosmetics Marketplace

A modern web application that combines beauty service booking with cosmetics e-commerce, featuring Instagram + Zomato inspired UI/UX design.

## 🌟 Features

### Core Functionality
- **Beauty Service Booking**: Find and book verified makeup artists, beauticians, and beauty parlours
- **Cosmetics E-Commerce**: Shop premium beauty products with affiliate and direct sales
- **Social Media Features**: Instagram-style video galleries, artist profiles, and beauty content
- **Dual User Roles**: Regular users and makeup artist accounts with different features

### User Features (Regular Users)
- **Multi-Login Options**: Phone number, Google OAuth, email + password
- **Profile Management**: Profile picture, personal details, Instagram integration
- **Artist Discovery**: Browse verified makeup artists with pricing, availability, and reviews
- **Service Booking**: Book services with calendar integration and real-time availability
- **Product Shopping**: Browse and purchase cosmetics with filters and search
- **Video Content**: Watch beauty tutorials, product reviews, and artist content
- **Booking Management**: View booking history, reschedule, cancel, and track status
- **Messaging**: Real-time chat with booked artists

### Artist Features (Makeup Artists)
- **Professional Verification**: ID upload, Instagram linking, blue verification badge
- **Service Management**: List services with pricing, duration, and categories
- **Availability Calendar**: Set available dates and times for bookings
- **Product Sales**: Sell own products or affiliate cosmetics
- **Portfolio Gallery**: Instagram-like photo and video showcase
- **Review Management**: View and respond to customer reviews
- **Booking Notifications**: Real-time notifications via app and WhatsApp
- **Payment Management**: Receive payments through the platform

### UI/UX Design
- **Instagram-Inspired**: Stories, feed layout, profile cards, and social interactions
- **Zomato-Inspired**: Service/product cards, filters, and search functionality
- **Mobile-First**: Responsive design with bottom navigation for mobile
- **Modern Aesthetics**: Clean, minimal design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Hooks (Context API for future expansion)
- **Authentication**: NextAuth.js (ready for integration)

### Backend (Planned)
- **Framework**: Django REST Framework or Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + OAuth providers
- **Payment Gateway**: Razorpay/Stripe with UPI support
- **Notifications**: WebSocket + WhatsApp API
- **File Storage**: AWS S3 or Cloudinary

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier (ready for setup)
- **Version Control**: Git
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd glamhive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 📱 Pages Overview

### Main Navigation
- **Home** (`/`): Hero section, featured artists, popular services, trending products
- **Artists** (`/artists`): Artist listing with search, filters, and detailed cards
- **Shop** (`/shop`): Cosmetics e-commerce with categories and product grid/list views
- **Videos** (`/videos`): Beauty tutorials and artist content in Instagram-style layout
- **Bookings** (`/bookings`): User booking history and management

### Additional Pages (Planned)
- **Artist Profile** (`/artists/[id]`): Detailed artist page with portfolio and booking
- **Product Details** (`/shop/product/[id]`): Individual product page with reviews
- **Video Player** (`/videos/[id]`): Video playback with comments and interactions
- **Booking Details** (`/bookings/[id]`): Individual booking management
- **User Profile** (`/profile`): User account management and settings
- **Authentication** (`/auth/*`): Login, signup, and verification pages

## 🎨 Design System

### Color Palette
- **Primary**: Pink (#E91E63) - Beauty industry standard
- **Secondary**: Purple (#9C27B0) - Luxury feel
- **Accent**: Orange (#FF6B35) - Call-to-action elements
- **Success**: Green (#4CAF50) - Positive states
- **Warning**: Orange (#FF9800) - Attention needed
- **Error**: Red (#F44336) - Error states

### Component Categories
- **Instagram-style**: Avatar rings, story layouts, social interactions
- **Zomato-style**: Cards with hover effects, rating systems, filters
- **Form elements**: Custom inputs with focus states and validation
- **Navigation**: Bottom nav for mobile, top header for desktop

### Responsive Design
- **Mobile**: 320px+ with bottom navigation
- **Tablet**: 768px+ with adjusted layouts
- **Desktop**: 1024px+ with sidebar and expanded features

## 🔒 Security Features (Planned)

- **Authentication**: Multi-factor authentication with phone verification
- **Data Protection**: GDPR compliant data handling
- **Payment Security**: PCI DSS compliant payment processing
- **API Security**: Rate limiting, CORS, and input validation
- **File Upload**: Secure image/video upload with validation

## 📊 Performance Optimization

- **Next.js Features**: SSR, ISR, and image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Static assets and API responses
- **SEO**: Meta tags, structured data, and sitemap

## 🧪 Testing (Planned)

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress for E2E testing
- **Performance Tests**: Lighthouse CI integration
- **Accessibility**: axe-core for a11y testing

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Roadmap

### Phase 1: Core Foundation ✅
- [x] Project setup with Next.js and TypeScript
- [x] UI components with Instagram + Zomato design
- [x] Main pages: Home, Artists, Shop, Videos, Bookings
- [x] Responsive navigation and layout

### Phase 2: Backend Integration (In Progress)
- [ ] Authentication system with multiple providers
- [ ] Database setup with user and artist models
- [ ] API routes for data fetching
- [ ] Real-time features with WebSocket

### Phase 3: Advanced Features
- [ ] Payment gateway integration
- [ ] Notification system
- [ ] Advanced search and recommendations
- [ ] Analytics and admin dashboard

### Phase 4: Mobile App
- [ ] React Native mobile application
- [ ] Push notifications
- [ ] Offline capabilities
- [ ] App store deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

- **Frontend Development**: Modern React/Next.js with TypeScript
- **UI/UX Design**: Instagram + Zomato inspired design system
- **Backend Development**: Scalable API with modern frameworks
- **Mobile Development**: React Native for cross-platform apps

## 📞 Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation wiki

---

**GlamHive** - Where Beauty Meets Technology 💄✨
