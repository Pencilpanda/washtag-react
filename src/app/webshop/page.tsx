'use client'

import { useProducts } from '@/hooks/use-products'
import { ProductCard } from '@/components/product-card'
import { BlueHeader } from "@/components/blue-header"

export default function Webshop() {
  const { products, loading, error } = useProducts()

  const breadcrumbs = [
    { label: 'KEZDŐLAP', href: '/' },
    { label: 'WEBSHOP', href: '/webshop' },
  ]

  if (loading) return <div className="container mx-auto px-4 py-8">Betöltés...</div>
  if (error) return <div className="container mx-auto px-4 py-8">Hiba: {error.message}</div>

  return (
    <>
      <BlueHeader title="WEBSHOP" breadcrumbs={breadcrumbs} />
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 font-karla text-white">Mosókártyák</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.mosokartyak.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 font-karla text-white">Feltöltések</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.feltoltesek.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

