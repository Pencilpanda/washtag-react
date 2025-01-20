import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api-utils'

interface Product {
  id: number
  name: string
  type: string
  price: string
  short_description: string
  description: string
  images: { src: string }[]
  categories: { id: number; name: string; slug: string }[]
}

interface CategorizedProducts {
  mosokartyak: Product[]
  feltoltesek: Product[]
}

export function useProducts(page = 1, perPage = 100) {
  const [products, setProducts] = useState<CategorizedProducts>({ mosokartyak: [], feltoltesek: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts(page, perPage)
        const categorized: CategorizedProducts = {
          mosokartyak: data.filter((product: Product) => 
            product.categories.some(cat => cat.slug === 'automoso-kartyak-vagy-washtag-automoso-husegkartyak')
          ),
          feltoltesek: data.filter((product: Product) => 
            product.categories.some(cat => cat.slug === 'automoso-kartyafeltoltesek-washtag-mosokartyakhoz')
          ),
        }
        setProducts(categorized)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Hiba történt a termékek betöltése közben'))
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, perPage])

  return { products, loading, error }
}

