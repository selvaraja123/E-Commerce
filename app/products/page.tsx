"use client"

import { useState, useMemo } from "react"
import { Filter, Grid3X3, LayoutGrid, List } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FilterPanel } from "@/components/filter-panel"
import { SortControl } from "@/components/sort-control"
import { ProductGrid } from "@/components/product-grid"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"

const ITEMS_PER_PAGE = 12

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<2 | 3 | 4>(4)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 1000] as [number, number],
    rating: null as number | null,
  })

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.some((cat) => product.category.toLowerCase().includes(cat.replace("-", " "))),
      )
    }

    // Apply brand filter (mock implementation)
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase())),
      )
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating >= filters.rating!)
    }

    // Sort products
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "name-a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setCurrentPage(1) // Reset to first page when sort changes
  }

  const activeFiltersCount = filters.categories.length + filters.brands.length + (filters.rating ? 1 : 0)

  const breadcrumbItems = [{ label: "Products" }]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-sans">All Products</h1>
              <p className="text-muted-foreground mt-1">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedProducts.length)} of{" "}
                {filteredAndSortedProducts.length} products
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 2 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(2)}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 3 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(3)}
                  className="px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 4 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(4)}
                  className="px-3"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort Control */}
              <SortControl currentSort={sortBy} onSortChange={handleSortChange} />

              {/* Mobile Filter Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden relative bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <FilterPanel onFiltersChange={handleFiltersChange} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 bg-card border rounded-lg p-6">
                <FilterPanel onFiltersChange={handleFiltersChange} />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Active Filters Summary */}
              {activeFiltersCount > 0 && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleFiltersChange({ categories: [], brands: [], priceRange: [0, 1000], rating: null })
                      }
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {paginatedProducts.length > 0 ? (
                <>
                  <ProductGrid products={paginatedProducts} columns={viewMode} className="mb-8" />

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      className="mb-8"
                    />
                  )}
                </>
              ) : (
                /* No Results */
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                    <Filter className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleFiltersChange({ categories: [], brands: [], priceRange: [0, 1000], rating: null })
                    }
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
