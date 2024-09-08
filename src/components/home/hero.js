'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-orange-500 text-white overflow-hidden">
      <div className="flex items-center justify-end h-screen">
        <div 
          className="relative w-1/2 h-full flex-1 bg-cover bg-center" 
          style={{ backgroundImage: 'url(/images/doc5.jpg)' }}
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
        <div className="relative max-w-xl px-6 py-32 sm:px-8 lg:px-12 lg:py-48 text-left z-10">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Hospital Management System
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Efficiently manage hospital operations with our comprehensive system.
          </p>
          <div className="mt-8">
            <Link 
              href="/auth/login" 
              className="inline-block bg-white text-black py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
