'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProduct, getCustomer } from '@/lib/api-utils'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Image from 'next/image'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedWashcard, setSelectedWashcard] = useState<string>('')
  const [washcards, setWashcards] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchProductAndWashcards() {
      try {
        setLoading(true)
        const productData = await getProduct(Number(id))
        setProduct(productData)

        if (productData.type === 'virtual') {
          // For demo purposes, we're using a hardcoded customer ID. In a real app, this would come from the authenticated user.
          const customerData = await getCustomer(1)
          // Assuming the customer has a 'washcards' meta field with their washcard IDs
          const customerWashcards = customerData.meta_data.find((meta: any) => meta.key === 'washcards')?.value || []
          setWashcards(customerWashcards)
        }

        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching the product'))
      } finally {
        setLoading(false)
      }
    }

    fetchProductAndWashcards()
  }, [id])

  if (loading) return <div className="container mx-auto px-4 py-8">Betöltés...</div>
  if (error) return <div className="container mx-auto px-4 py-8">Hiba: {error.message}</div>
  if (!product) return <div className="container mx-auto px-4 py-8">A termék nem található</div>

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Kosárba helyezés:', { product, quantity, selectedWashcard })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4 font-karla">{product.name}</CardTitle>
          <CardDescription className="text-2xl font-bold mb-4 font-inconsolata">{product.price} Ft</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product.images[0]?.src || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <div className="font-inconsolata mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
            
            {product.categories.some(cat => cat.slug === 'automoso-kartyafeltoltesek-washtag-mosokartyakhoz') && washcards.length > 0 && (
              <div className="mb-4">
                <label htmlFor="washcard-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Válassza ki a feltöltendő mosókártyát
                </label>
                <Select onValueChange={setSelectedWashcard} value={selectedWashcard}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Válasszon mosókártyát" />
                  </SelectTrigger>
                  <SelectContent>
                    {washcards.map((washcard: string) => (
                      <SelectItem key={washcard} value={washcard}>
                        Mosókártya {washcard}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Mennyiség
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full font-inconsolata bg-[#1CBA8D] hover:bg-[#19A67E]"
            onClick={handleAddToCart}
            disabled={product.categories.some(cat => cat.slug === 'automoso-kartyafeltoltesek-washtag-mosokartyakhoz') && !selectedWashcard}
          >
            Kosárba
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

