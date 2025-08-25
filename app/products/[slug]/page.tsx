import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductTabs } from "@/components/product-tabs"
import { RelatedProducts } from "@/components/related-products"
import { mockProducts } from "@/lib/mock-data"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.category, href: `/products?category=${product.category.toLowerCase().replace(" ", "-")}` },
    { label: product.name },
  ]

  const productDetails = {
    ...product,
    images: [product.image, "/product-angle-2.png", "/product-angle-3.png", "/product-detail-close-up.png"],
    variants: {
      colors:
        product.category.includes("Fashion") || product.category === "Footwear"
          ? [
              { name: "Black", value: "#000000", available: true },
              { name: "White", value: "#FFFFFF", available: true },
              { name: "Navy", value: "#1e3a8a", available: false },
            ]
          : [],
      sizes:
        product.category.includes("Fashion") || product.category === "Footwear"
          ? [
              { name: "XS", available: false },
              { name: "S", available: true },
              { name: "M", available: true },
              { name: "L", available: true },
              { name: "XL", available: true },
              { name: "XXL", available: false },
            ]
          : product.category === "Electronics"
            ? [
                { name: "128GB", available: true },
                { name: "256GB", available: true },
                { name: "512GB", available: false },
              ]
            : [],
    },
    inStock: true,
    stockCount: 23,
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    specifications: {
      Brand: product.name.split(" ")[0],
      Model: product.name,
      Category: product.category,
      Rating: `${product.rating}/5 (${product.reviewCount} reviews)`,
      Availability: "In Stock",
    },
    features: [
      "Premium quality materials",
      "Advanced technology integration",
      "Ergonomic design",
      "Long-lasting durability",
      "Warranty included",
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <ProductGallery images={productDetails.images} productName={product.name} />
            <ProductInfo product={productDetails} />
          </div>

          <ProductTabs product={productDetails} />

          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
