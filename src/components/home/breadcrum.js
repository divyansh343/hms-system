'use client'

import Link from 'next/link'

export default function Breadcrumb({title}) {
  return (
    <nav className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
      <ol className="list-reset flex text-blue-600">
        <li>
          <Link href="/" className="hover:text-blue-700">Home</Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
        </li>
        <li className="mx-2">/</li>
        <li className="text-gray-500">{title}</li> {/* Adjust as needed */}
      </ol>
    </nav>
  )
}
