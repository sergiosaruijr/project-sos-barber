"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { BookingCard, BookingDetails } from "./index"
import { BookingWithDetails } from "./types"

const BookingSheet = ({ booking }: { booking: BookingWithDetails }) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <BookingCard booking={booking} variant="list" />
      </SheetTrigger>
      <SheetContent side="right" className="h-full overflow-auto">
        <BookingDetails booking={booking} onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export default BookingSheet
