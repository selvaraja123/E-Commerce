"use client"

import { useState } from "react"
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    category: string
    discount?: number
    inStock: boolean
    stockCount: number
    deliveryDate: Date
    variants: {
      colors: Array<{ name: string; value: string; available: boolean }>
      sizes: Array<{ name: string; available: boolean }>
    }
    features: string[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants.colors.find((c) => c.available)?.name || "")
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes.find((s) => s.available)?.name || "")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const formatDeliveryDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn("h-4 w-4", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{product.category}</Badge>
          {product.discount && <Badge variant="destructive">-{product.discount}% OFF</Badge>}
        </div>

        <h1 className="text-3xl font-bold font-sans mb-3">{product.name}</h1>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
            <span className="font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
            <Badge variant="secondary" className="text-green-600">
              Save ${product.originalPrice - product.price}
            </Badge>
          </>
        )}
      </div>

      <Separator />

      {/* Color Selection */}
      {product.variants.colors.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
          <div className="flex gap-2">
            {product.variants.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => color.available && setSelectedColor(color.name)}
                disabled={!color.available}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all",
                  selectedColor === color.name ? "border-primary scale-110" : "border-muted-foreground/30",
                  !color.available && "opacity-50 cursor-not-allowed",
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.variants.sizes.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.sizes.map((size) => (
              <Button
                key={size.name}
                variant={selectedSize === size.name ? "default" : "outline"}
                size="sm"
                onClick={() => size.available && setSelectedSize(size.name)}
                disabled={!size.available}
                className="min-w-[50px]"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 font-medium min-w-[50px] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
              disabled={quantity >= product.stockCount}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">{product.stockCount} available</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="h-5 w-5 text-accent" />
          <span className="font-medium">Delivery Information</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Get it by <strong>{formatDeliveryDate(product.deliveryDate)}</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-1">Free shipping on orders over $50</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button size="lg" className="flex-1">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(isWishlisted && "text-red-500")}
          >
            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
          </Button>
        </div>

        <Button variant="secondary" size="lg" className="w-full">
          Buy Now
        </Button>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center gap-6 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="h-4 w-4 text-blue-600" />
          <span>30-Day Returns</span>
        </div>
      </div>
    </div>
  )
}
