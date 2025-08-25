"use client"

import { Star, ThumbsUp, MessageCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ProductTabsProps {
  product: {
    specifications: Record<string, string>
    features: string[]
    rating: number
    reviewCount: number
  }
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent quality!",
    content: "Really impressed with the build quality and performance. Exactly what I was looking for.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Good value for money",
    content: "Great product overall. Minor issues with setup but customer service was helpful.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    author: "Emma Davis",
    rating: 5,
    date: "2024-01-05",
    title: "Highly recommend",
    content: "Perfect for my needs. Fast shipping and well packaged. Will definitely buy again.",
    helpful: 15,
    verified: false,
  },
]

const mockQA = [
  {
    id: 1,
    question: "Is this compatible with older models?",
    answer: "Yes, this product is backward compatible with models from the last 3 years.",
    author: "Product Team",
    date: "2024-01-12",
    helpful: 5,
  },
  {
    id: 2,
    question: "What is the warranty period?",
    answer: "This product comes with a 2-year manufacturer warranty covering defects and normal wear.",
    author: "Customer Service",
    date: "2024-01-08",
    helpful: 3,
  },
]

export function ProductTabs({ product }: ProductTabsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn("h-4 w-4", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
      />
    ))
  }

  return (
    <Tabs defaultValue="specifications" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        <TabsTrigger value="qa">Q&A</TabsTrigger>
      </TabsList>

      <TabsContent value="specifications" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-muted-foreground">{key}:</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          {/* Review Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">{renderStars(product.rating)}</div>
                  <div className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</div>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-8">{stars}★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{Math.floor(Math.random() * 50)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground mb-3">{review.content}</p>

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="qa" className="mt-6">
        <div className="space-y-4">
          {mockQA.map((qa) => (
            <Card key={qa.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">{qa.question}</h4>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="pl-7">
                    <p className="text-muted-foreground mb-2">{qa.answer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Answered by {qa.author} on {new Date(qa.date).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {qa.helpful}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium mb-2">Have a question?</h3>
              <p className="text-muted-foreground mb-4">Ask other customers or our product experts</p>
              <Button>Ask a Question</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
