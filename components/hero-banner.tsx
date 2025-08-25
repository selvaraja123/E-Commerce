import Link from "next/link"
import { ArrowRight, Zap, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Main Hero Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold font-sans leading-tight">
                Discover the Latest in <span className="text-primary">Electronics</span> &{" "}
                <span className="text-accent">Fashion</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Shop cutting-edge technology and trendy fashion items all in one place. Get the best deals on premium
                products with fast, free shipping.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/deals">View Deals</Link>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-accent" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-accent" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-5 w-5 text-accent" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Promo Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <img src="/smartphone-icon.png" alt="Electronics" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Latest Electronics</h3>
                  <p className="text-sm text-muted-foreground">Up to 30% off</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Shop Electronics
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <img src="/fashion-icon.png" alt="Fashion" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Trendy Fashion</h3>
                  <p className="text-sm text-muted-foreground">New arrivals</p>
                </div>
                <Button variant="ghost" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground">
                  Shop Fashion
                </Button>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <img src="/sale-tag-icon.png" alt="Special Offers" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Special Offers</h3>
                  <p className="text-sm text-muted-foreground">Limited time deals</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:bg-destructive group-hover:text-destructive-foreground"
                >
                  View All Deals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
