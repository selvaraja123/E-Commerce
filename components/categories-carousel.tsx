"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    image: "/modern-smartphone.png",
    href: "/products?category=smartphones",
    count: 45,
  },
  {
    id: "laptops",
    name: "Laptops",
    image: "/modern-laptop-workspace.png",
    href: "/products?category=laptops",
    count: 32,
  },
  {
    id: "audio",
    name: "Audio",
    image: "/diverse-people-listening-headphones.png",
    href: "/products?category=audio",
    count: 28,
  },
  {
    id: "gaming",
    name: "Gaming",
    image: "/gaming-controller.png",
    href: "/products?category=gaming",
    count: 19,
  },
  {
    id: "mens-fashion",
    name: "Men's Fashion",
    image: "/mens-clothing-display.png",
    href: "/products?category=mens-fashion",
    count: 67,
  },
  {
    id: "womens-fashion",
    name: "Women's Fashion",
    image: "/womens-clothing.png",
    href: "/products?category=womens-fashion",
    count: 89,
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/fashion-accessories-flatlay.png",
    href: "/products?category=accessories",
    count: 34,
  },
  {
    id: "footwear",
    name: "Footwear",
    image: "/diverse-sneaker-collection.png",
    href: "/products?category=footwear",
    count: 56,
  },
]

export function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, categories.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-sans">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Explore our wide range of products across different categories</p>
          </div>

          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.count} products</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentIndex === i ? "bg-primary" : "bg-muted-foreground/30",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
