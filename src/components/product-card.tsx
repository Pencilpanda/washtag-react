'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getProductPointsValue } from '@/lib/api-utils'

interface ProductCardProps {
  product: any // Replace with a proper type when available
}

export function ProductCard({ product }: ProductCardProps) {
  const [pointsValue, setPointsValue] = useState<number | null>(null)

  useEffect(() => {
    async function fetchPointsValue() {
      try {
        const pointsData = await getProductPointsValue(product.id)
        setPointsValue(pointsData.points)
      } catch (err) {
        console.error('Failed to fetch product points value:', err)
      }
    }

    fetchPointsValue()
  }, [product.id])

  // Format price to include thousand separators
  const formattedPrice = parseInt(product.price).toLocaleString('hu-HU')

  return (
    <Card className="bg-[#1C1F26] border-none overflow-hidden flex flex-col">
      <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
        <Image
          src={product.images[0]?.src || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ghWIT7YIyyy4YOSi55gybrP7wTpyFR.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow p-2 sm:p-4 h-[140px] sm:h-[180px]">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-xl font-bold text-white tracking-wide line-clamp-2">
            {product.name.toUpperCase()}
          </h3>
          <p className="text-[#1CBA8D] text-lg sm:text-2xl font-bold tracking-wide">
            {formattedPrice} Ft
          </p>
          <p className="text-white/90 text-xs sm:text-base">
            + {pointsValue || '150'} KREDIT
          </p>
        </div>

        <Button 
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2 sm:py-4 text-xs sm:text-base rounded-md transition-colors mt-auto"
        >
          KOSÁRBA TESZEM
        </Button>
      </div>
    </Card>
  )
}

