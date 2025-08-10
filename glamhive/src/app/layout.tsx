import type { Metadata } from "next";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import "./globals.css";

export const metadata: Metadata = {
  title: "GlamHive - Beauty Services & Cosmetics Marketplace",
  description: "Book makeup artists, beauticians, and beauty parlours. Shop premium cosmetics. Connect with beauty professionals.",
  keywords: "makeup artist, beauty services, cosmetics, beauty parlour, booking, beauty marketplace",
  authors: [{ name: "GlamHive Team" }],
  creator: "GlamHive",
  publisher: "GlamHive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GlamHive - Beauty Services & Cosmetics Marketplace",
    description: "Book makeup artists, beauticians, and beauty parlours. Shop premium cosmetics.",
    url: "https://glamhive.com",
    siteName: "GlamHive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlamHive - Beauty Services & Cosmetics Marketplace",
    description: "Book makeup artists, beauticians, and beauty parlours. Shop premium cosmetics.",
    creator: "@glamhive",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="h-full bg-gray-50 antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
