'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Play, 
  MessageCircle, 
  Calendar,
  User,
  Heart
} from 'lucide-react';

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    activeIcon: Home,
  },
  {
    name: 'Artists',
    href: '/artists',
    icon: Search,
    activeIcon: Search,
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: ShoppingBag,
    activeIcon: ShoppingBag,
  },
  {
    name: 'Videos',
    href: '/videos',
    icon: Play,
    activeIcon: Play,
  },
  {
    name: 'Bookings',
    href: '/bookings',
    icon: Calendar,
    activeIcon: Calendar,
  },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <nav className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          const IconComponent = isActive ? item.activeIcon : item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-pink-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <IconComponent 
                size={24} 
                className={`transition-all duration-200 ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-pink-600' : 'text-gray-600'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavigation;