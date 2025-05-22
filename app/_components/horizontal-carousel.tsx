"use client"

import { useEffect, useRef, useState } from "react"
import { Barbershop } from "@prisma/client" // ajuste conforme seu tipo
import BarbershopItem from "./barbershop-item"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HorizontalCarouselProps {
  items: Barbershop[]
}

export default function HorizontalCarousel({ items }: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const checkScroll = () => {
    const container = scrollRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setShowLeft(scrollLeft > 0)
      setShowRight(scrollLeft + clientWidth < scrollWidth)
    }
  }

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    checkScroll()
    container.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      container.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  return (
    <div className="relative">
      {showLeft && (
        <Button
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2"
          onClick={() => scroll("left")}
          size="icon"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
      )}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <BarbershopItem key={item.id} barbershop={item} />
        ))}
      </div>

      {showRight && (
        <Button
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2"
          onClick={() => scroll("right")}
          size="icon"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>
      )}
    </div>
  )
}
