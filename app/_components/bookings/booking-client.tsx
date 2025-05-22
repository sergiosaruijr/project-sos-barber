"use client"

import { useState } from "react"
import { BookingWithDetails, BookingsClientProps } from "./types"
import { useMediaQuery } from "@/app/_hooks/use-media-query"
import { BookingDetails, BookingSheet, BookingCard } from "./index"
import Header from "../header"

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
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 lg:px-36 lg:pb-24">
        {/* Coluna esquerda */}
        <div className="w-full space-y-3 px-5 pt-10 lg:w-1/2">
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <p className="pt-4 text-xs text-gray-400">CONFIRMADOS</p>
          {confirmedBookings.map((booking) =>
            isMobile ? (
              <BookingSheet key={booking.id} booking={booking} />
            ) : (
              <div key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <BookingCard booking={booking} />
              </div>
            ),
          )}
          {confirmedBookings.length === 0 && (
            <p className="text-sm text-gray-200">
              Não há agendamentos confirmados.
            </p>
          )}

          <p className="pt-5 text-xs text-gray-400">FINALIZADOS</p>
          {concludedBookings.map((booking) =>
            isMobile ? (
              <BookingSheet key={booking.id} booking={booking} />
            ) : (
              <div key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <BookingCard booking={booking} />
              </div>
            ),
          )}
          {concludedBookings.length === 0 && (
            <p className="mb-5 text-sm text-gray-200">
              Não há agendamentos finalizados.
            </p>
          )}
        </div>

        {/* Coluna direta*/}
        {!isMobile && (
          <div className="w-full lg:sticky lg:top-4 lg:h-fit lg:w-1/2 lg:pt-10">
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
