import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { mockProducts } from "@/lib/mock-data"

export function TrendingProducts() {
  // Get first 8 products as trending
  const trendingProducts = mockProducts.slice(0, 8)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-sans">Trending Products</h2>
            <p className="text-muted-foreground mt-2">Discover what's popular right now</p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/products" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={trendingProducts} columns={4} />
      </div>
    </section>
  )
}
