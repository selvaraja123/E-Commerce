"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = {
  electronics: {
    title: "Electronics",
    sections: [
      {
        title: "Smartphones & Tablets",
        items: ["iPhone", "Samsung Galaxy", "iPad", "Android Tablets"],
      },
      {
        title: "Computers & Laptops",
        items: ["MacBook", "Gaming Laptops", "Desktop PCs", "Accessories"],
      },
      {
        title: "Audio & Video",
        items: ["Headphones", "Speakers", "Smart TVs", "Gaming Consoles"],
      },
    ],
  },
  fashion: {
    title: "Fashion",
    sections: [
      {
        title: "Men's Fashion",
        items: ["Shirts", "Pants", "Shoes", "Accessories"],
      },
      {
        title: "Women's Fashion",
        items: ["Dresses", "Tops", "Shoes", "Handbags"],
      },
      {
        title: "Kids & Baby",
        items: ["Boys Clothing", "Girls Clothing", "Baby Essentials", "Toys"],
      },
    ],
  },
}

export function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Electronics</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-3 gap-4 p-6">
              {categories.electronics.sections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/products?category=electronics&subcategory=${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block text-sm hover:text-primary transition-colors"
                          >
                            {item}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Fashion</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-3 gap-4 p-6">
              {categories.fashion.sections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/products?category=fashion&subcategory=${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block text-sm hover:text-primary transition-colors"
                          >
                            {item}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/products?category=home"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              Home & Garden
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/products?category=sports"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              Sports & Outdoors
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/deals"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              Deals
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
