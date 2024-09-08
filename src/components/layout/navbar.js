'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, X } from 'lucide-react'
import Image from 'next/image'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo2.webp" // Path to your logo image
                alt="Hospital Management System Logo"
                width={40} // Adjust width as needed
                height={40} // Adjust height as needed
                className="mr-1" // Margin to the right of the logo
              />
              <span className="text-2xl font-bold">HMS</span>
            </Link>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:space-x-8">
            <Link href="/" className="hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="#features" className="hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium">Features</Link>
            <Link href="#photos" className="hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium">Photos</Link>
            {/* <Link href="/about" className="hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium">About</Link> */}
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <Link href="/" className="hover:bg-blue-100 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link href="#features" className="hover:bg-blue-100 block px-3 py-2 rounded-md text-base font-medium">Features</Link>
          <Link href="#contact" className="hover:bg-blue-100 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          <Link href="/about" className="hover:bg-blue-100 block px-3 py-2 rounded-md text-base font-medium">About</Link>
        </div>
      </div>
    </nav>
  )
}