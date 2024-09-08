'use client'

import Image from 'next/image'

function RectangleImage({ src, alt, width = '100%', height = 'auto', className = '' }) {
  return (
    <div className={`relative ${className} w-full`} style={{ paddingBottom: height === 'auto' ? 'auto' : `${(height / width) * 100}%` }}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}


export default function Flex() {
  return (
    <div id="photos" className="p-6">
      <div className="grid grid-cols-1 gap-2">
        <RectangleImage
          src="/images/f1.jpg"
          alt="Hospital Building 1"
          width={1500}
          height={300}
        />
        <RectangleImage
          src="/images/f2.jpg"
          alt="Hospital Building 2"
          width={1500}
          height={300}
        />
        <RectangleImage
          src="/images/f3.jpg"
          alt="Hospital Building 3"
          width={1500}
          height={300}
        />
      </div>
    </div>
  )
}
