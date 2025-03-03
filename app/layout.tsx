import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '4 Year Planner for UCI',
  description: 'A 4 year planner designed for UCI students',
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
    <ClerkProvider localization={localization}>
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}