"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

interface FilterPanelProps {
  onFiltersChange?: (filters: any) => void
  className?: string
}

const categories = [
  { id: "smartphones", label: "Smartphones", count: 45 },
  { id: "laptops", label: "Laptops", count: 32 },
  { id: "audio", label: "Audio", count: 28 },
  { id: "gaming", label: "Gaming", count: 19 },
  { id: "mens-fashion", label: "Men's Fashion", count: 67 },
  { id: "womens-fashion", label: "Women's Fashion", count: 89 },
  { id: "accessories", label: "Accessories", count: 34 },
  { id: "footwear", label: "Footwear", count: 56 },
]

const brands = [
  { id: "apple", label: "Apple", count: 23 },
  { id: "samsung", label: "Samsung", count: 18 },
  { id: "nike", label: "Nike", count: 34 },
  { id: "adidas", label: "Adidas", count: 28 },
  { id: "sony", label: "Sony", count: 15 },
  { id: "dell", label: "Dell", count: 12 },
]

export function FilterPanel({ onFiltersChange, className }: FilterPanelProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [openSections, setOpenSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked ? [...selectedCategories, categoryId] : selectedCategories.filter((id) => id !== categoryId)
    setSelectedCategories(updated)
    onFiltersChange?.({ categories: updated, brands: selectedBrands, priceRange, rating: selectedRating })
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const updated = checked ? [...selectedBrands, brandId] : selectedBrands.filter((id) => id !== brandId)
    setSelectedBrands(updated)
    onFiltersChange?.({ categories: selectedCategories, brands: updated, priceRange, rating: selectedRating })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFiltersChange?.({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: value,
      rating: selectedRating,
    })
  }

  const handleRatingChange = (rating: number) => {
    const newRating = selectedRating === rating ? null : rating
    setSelectedRating(newRating)
    onFiltersChange?.({ categories: selectedCategories, brands: selectedBrands, priceRange, rating: newRating })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 1000])
    setSelectedRating(null)
    onFiltersChange?.({ categories: [], brands: [], priceRange: [0, 1000], rating: null })
  }

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + (selectedRating ? 1 : 0)

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="gap-1">
                    {category?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                  </Badge>
                )
              })}
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b.id === brandId)
                return (
                  <Badge key={brandId} variant="secondary" className="gap-1">
                    {brand?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleBrandChange(brandId, false)} />
                  </Badge>
                )
              })}
              {selectedRating && (
                <Badge variant="secondary" className="gap-1">
                  {selectedRating}+ Stars
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRating(null)} />
                </Badge>
              )}
            </div>
          </div>
        )}

        <Separator />

        {/* Category Filter */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection("category")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Category</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="flex-1 text-sm cursor-pointer">
                  {category.label}
                </Label>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Brand Filter */}
        <Collapsible open={openSections.brand} onOpenChange={() => toggleSection("brand")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Brand</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                />
                <Label htmlFor={brand.id} className="flex-1 text-sm cursor-pointer">
                  {brand.label}
                </Label>
                <span className="text-xs text-muted-foreground">({brand.count})</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Price Range Filter */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Price Range</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Rating Filter */}
        <Collapsible open={openSections.rating} onOpenChange={() => toggleSection("rating")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Rating</span>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={selectedRating === rating ? "default" : "ghost"}
                className="w-full justify-start h-auto p-2"
                onClick={() => handleRatingChange(rating)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-muted-foreground"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm">& Up</span>
                </div>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
