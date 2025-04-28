"use client"

import { useState } from "react"
import { BookingWithDetails, BookingsClientProps } from "./types"
import { useMediaQuery } from "@/app/_hooks/use-media-query"
import { BookingDetails, BookingSheet, BookingCard } from "./index"
import Header from "../header"

// eslint-disable-next-line no-unused-vars
const BookingsClient = ({
  confirmedBookings,
  concludedBookings,
}: BookingsClientProps) => {
  const allBookings = [...confirmedBookings, ...concludedBookings]
  const [selectedBooking, setSelectedBooking] = useState<BookingWithDetails>(
    allBookings[0],
  )
  const isMobile = useMediaQuery("(max-width: 1024px)")

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Coluna esquerda */}
        <div className="w-full space-y-3 lg:w-1/2">
          {confirmedBookings.map((booking) =>
            isMobile ? (
              <BookingSheet key={booking.id} booking={booking} />
            ) : (
              <div key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <BookingCard booking={booking} />
              </div>
            ),
          )}

          {concludedBookings.map((booking) =>
            isMobile ? (
              <BookingSheet key={booking.id} booking={booking} />
            ) : (
              <div key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <BookingCard booking={booking} />
              </div>
            ),
          )}
        </div>

        {/* Coluna direta (apenas desktop) */}
        {!isMobile && (
          <div className="w-full lg:sticky lg:top-4 lg:h-fit lg:w-1/2">
            {selectedBooking ? (
              <BookingDetails booking={selectedBooking} />
            ) : (
              <p>Selecione um agendamento</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsClient
