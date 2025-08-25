import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { CategoriesCarousel } from "@/components/categories-carousel"
import { TrendingProducts } from "@/components/trending-products"
import { DealOfTheDay } from "@/components/deal-of-the-day"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <CategoriesCarousel />
        <TrendingProducts />
        <DealOfTheDay />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
