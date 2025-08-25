import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  // Get related products from same category, excluding current product
  const relatedProducts = mockProducts
    .filter((product) => product.id !== currentProductId && product.category === category)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12 border-t">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold font-sans">Related Products</h2>
          <p className="text-muted-foreground mt-1">More items from {category}</p>
        </div>

        <Button variant="outline" asChild>
          <Link href={`/products?category=${category.toLowerCase().replace(" ", "-")}`} className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <ProductGrid products={relatedProducts} columns={4} />
    </section>
  )
}
