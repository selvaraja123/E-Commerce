"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const dealProduct = {
    id: "deal-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    originalPrice: 399,
    dealPrice: 299,
    rating: 4.9,
    reviewCount: 1247,
    image: "/sony-wh-1000xm5.png",
    discount: 25,
    soldCount: 127,
    totalStock: 200,
  }

  const progressPercentage = (dealProduct.soldCount / dealProduct.totalStock) * 100

  return (
    <section className="py-12 bg-gradient-to-r from-destructive/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="destructive" className="mb-4 text-sm px-4 py-2">
            Limited Time Offer
          </Badge>
          <h2 className="text-3xl font-bold font-sans">Deal of the Day</h2>
          <p className="text-muted-foreground mt-2">Don't miss out on today's incredible deal</p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative aspect-square lg:aspect-auto bg-muted/30 flex items-center justify-center p-8">
                <img
                  src={dealProduct.image || "/placeholder.svg"}
                  alt={dealProduct.name}
                  className="max-w-full max-h-full object-contain"
                />
                <Badge variant="destructive" className="absolute top-4 left-4 text-lg px-3 py-1">
                  -{dealProduct.discount}%
                </Badge>
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{dealProduct.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(dealProduct.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({dealProduct.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-destructive">${dealProduct.dealPrice}</span>
                    <span className="text-xl text-muted-foreground line-through">${dealProduct.originalPrice}</span>
                    <Badge variant="secondary">Save ${dealProduct.originalPrice - dealProduct.dealPrice}</Badge>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-destructive" />
                    <span className="font-semibold">Deal ends in:</span>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div className="bg-background rounded-lg p-3 min-w-[60px]">
                      <div className="text-2xl font-bold text-destructive">
                        {timeLeft.hours.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted-foreground">Hours</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 min-w-[60px]">
                      <div className="text-2xl font-bold text-destructive">
                        {timeLeft.minutes.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted-foreground">Minutes</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 min-w-[60px]">
                      <div className="text-2xl font-bold text-destructive">
                        {timeLeft.seconds.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted-foreground">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* Stock Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Already sold: {dealProduct.soldCount}</span>
                    <span>Available: {dealProduct.totalStock - dealProduct.soldCount}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    Hurry! Only {dealProduct.totalStock - dealProduct.soldCount} left in stock
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/products/sony-wh-1000xm5">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
