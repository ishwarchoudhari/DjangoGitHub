# GlamHive - Beauty Services & Cosmetics Marketplace

A modern web application for booking beauty services, shopping cosmetics, and connecting with makeup artists. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 Beauty Service Booking
- Browse verified makeup artists and beauticians
- View detailed service listings with pricing
- Real-time availability calendar
- Instant booking with notifications
- Artist verification system with blue tick badges

### 🛍️ Cosmetics E-Commerce
- Premium beauty products from top brands
- Advanced search and filtering
- Wishlist and shopping cart functionality
- Product reviews and ratings
- Secure payment integration

### 📱 Social Media Features
- Instagram-style photo/video galleries
- Artist profiles and portfolios
- Customer reviews and ratings
- Direct messaging system
- Social sharing and engagement

### 👤 User Management
- Multiple authentication options (Email, Google, Phone)
- Separate user types (Customers & Artists)
- Profile management with Instagram integration
- Location-based services

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand, React Hook Form
- **Authentication**: JWT, Google OAuth, Phone OTP
- **UI Components**: Headless UI, Heroicons
- **Backend**: Django (planned), PostgreSQL
- **Payments**: Razorpay/Stripe integration
- **Notifications**: WebSocket, WhatsApp API

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd glamhive
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   GOOGLE_CLIENT_ID=your_google_client_id
   RAZORPAY_KEY_ID=your_razorpay_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
glamhive/
├── app/                    # Next.js 13+ App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── cosmetics/         # E-commerce section
│   ├── artists/           # Artist listings
│   ├── videos/            # Video content
│   ├── messages/          # Chat system
│   └── bookings/          # Booking management
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── forms/            # Form components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎯 Key Components

### Authentication System
- **Signup**: Customer/Artist registration with verification
- **Login**: Multiple authentication methods
- **Profile Management**: User profiles with social links

### Dashboard
- **Artist Feed**: Instagram-style posts and services
- **Service Discovery**: Browse and filter beauty services
- **Booking Management**: View and manage appointments

### E-Commerce
- **Product Catalog**: Beauty products with categories
- **Shopping Cart**: Add/remove items
- **Wishlist**: Save favorite products
- **Checkout**: Secure payment processing

### Artist Features
- **Service Management**: Add/edit services and pricing
- **Availability Calendar**: Mark available dates/times
- **Portfolio**: Upload work photos and videos
- **Order Management**: Handle booking requests

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Tailwind**: Utility-first CSS framework

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow Tailwind CSS best practices
- Add Framer Motion animations for UX
- Ensure responsive design

## 🌐 API Integration

### Backend Endpoints (Planned)

```typescript
// Authentication
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/verify-phone

// Artists
GET /api/artists
GET /api/artists/:id
GET /api/artists/:id/services

// Services
POST /api/bookings
GET /api/bookings/user
PUT /api/bookings/:id

// Products
GET /api/products
GET /api/products/:id
POST /api/cart/add
```

## 🎨 Design System

### Color Palette
- **Primary**: Pink (#ec4899) - Beauty & Glamour
- **Secondary**: Yellow (#eab308) - Warm & Inviting
- **Accent**: Blue (#0ea5e9) - Trust & Professionalism
- **Beauty**: Custom pink/rose/coral variations

### Typography
- **Primary**: Inter - Clean, modern sans-serif
- **Display**: Playfair Display - Elegant serif for headings

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Primary, secondary, and accent variants
- **Forms**: Clean inputs with focus states
- **Navigation**: Instagram-inspired icon-based nav

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind's responsive utilities
- **Touch Friendly**: Proper touch targets and gestures
- **Progressive Enhancement**: Core functionality works everywhere

## 🔒 Security Features

- **Authentication**: JWT tokens with refresh
- **Input Validation**: Form validation and sanitization
- **HTTPS**: Secure communication
- **Rate Limiting**: API protection
- **Data Privacy**: GDPR compliance ready

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the docs folder
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: support@glamhive.com

## 🔮 Roadmap

### Phase 1 (Current)
- [x] User authentication system
- [x] Artist discovery and profiles
- [x] Basic booking functionality
- [x] Cosmetics marketplace

### Phase 2
- [ ] Payment integration
- [ ] Real-time messaging
- [ ] Video content platform
- [ ] Mobile app development

### Phase 3
- [ ] AI-powered recommendations
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Enterprise features

---

**Built with ❤️ for the beauty community**