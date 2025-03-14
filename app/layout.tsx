import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'UCI 4 Year Planner | Course Planning for UC Irvine Students',
  description: 'Create and customize your 4 year academic plan for UC Irvine. Organize courses, track requirements, and plan your UCI degree path semester by semester.',
  keywords: ['UCI', 'UC Irvine', '4 year plan', 'course planning', 'academic planner', 'degree planning', 'college schedule', 'UCI courses', 'uci 4 year plan', 'uci course planner', 'uci planner', 'uci 4 year planner'],
  authors: [{ name: 'Caleb Vergene' }],
  openGraph: {
    title: 'UCI 4 Year Planner | Course Planning for UC Irvine Students',
    description: 'Create and customize your 4 year academic plan for UC Irvine. Organize courses, track requirements, and plan your UCI degree path.',
    url: 'https://uci4yearplan.com',
    siteName: 'UCI 4 Year Planner',
    locale: 'en_US',
    type: 'website',
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
}

const localization = {
  signIn: {
    start: {
      title: "Welcome Back",
      subtitle: "Sign in to access your planner", // Custom subtitle
      actionText: "Don't have an account?",
      actionLink: "Sign up",
      emailAddressLabel: "Your Email", // Customize the email field label
      usernamePlaceholder: "Enter your email address"
    },
    
  },
  signUp: {
    start: {
      title: 'Create Your Account',
      subtitle: 'Sign up to save your planner',
      actionText: 'Have an account?',
      actionLink: 'Sign in',
    },
    
  },
  // You can also customize error messages, buttons, etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={localization} appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}>
      <html lang="en" className="dark">
        <head>
          {/* Add structured data for rich results */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'UCI 4 Year Planner',
                description: 'Interactive academic planning tool for UC Irvine students',
                applicationCategory: 'Education',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                audience: {
                  '@type': 'EducationalAudience',
                  educationalRole: 'student',
                },
              }),
            }}
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}