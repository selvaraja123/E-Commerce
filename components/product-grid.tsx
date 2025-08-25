import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  isNew?: boolean
  discount?: number
  slug: string
}

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4 | 6
  className?: string
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
