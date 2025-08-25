"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, Star, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductCardProps {
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
  className?: string
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  category,
  isNew,
  discount,
  slug,
  className,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
    // Show toast notification here
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn("h-3 w-3", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
      />
    ))
  }

  return (
    <Card className={cn("group relative overflow-hidden hover:shadow-lg transition-shadow", className)}>
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${slug}`}>
          <img
            src={image || "/placeholder.svg?height=300&width=300"}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              New
            </Badge>
          )}
          {discount && <Badge variant="destructive">-{discount}%</Badge>}
        </div>

        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" className="h-8 w-8" onClick={handleWishlistToggle}>
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to cart button - appears on hover */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full" onClick={handleAddToCart} disabled={isLoading}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>

          <Link href={`/products/${slug}`}>
            <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">{name}</h3>
          </Link>

          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${price}</span>
            {originalPrice && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
