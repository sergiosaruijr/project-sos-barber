"use client"

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { BookingCard, BookingDetails } from "./index"
import { BookingWithDetails } from "./types"

const BookingSheet = ({ booking }: { booking: BookingWithDetails }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <BookingCard booking={booking} variant="list" />
      </SheetTrigger>
      <SheetContent side="right" className="h-[85vh] overflow-auto">
        <BookingDetails booking={booking} />
      </SheetContent>
    </Sheet>
  )
}

export default BookingSheet
