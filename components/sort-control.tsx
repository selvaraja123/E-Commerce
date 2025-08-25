"use client"

import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SortControlProps {
  currentSort: string
  onSortChange: (sort: string) => void
}

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" },
  { value: "name-a-z", label: "Name: A to Z" },
]

export function SortControl({ currentSort, onSortChange }: SortControlProps) {
  const currentOption = sortOptions.find((option) => option.value === currentSort)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowUpDown className="h-4 w-4" />
          Sort by: {currentOption?.label || "Relevance"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={currentSort === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
