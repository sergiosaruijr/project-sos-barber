"use client"

import { useState, useEffect, useMemo } from "react"
import { isPast, isToday, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Booking } from "@prisma/client"
import { getBookings } from "@/app/_actions/get-bookings"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Calendar } from "../ui/calendar"
import { Button } from "../ui/button"
import { BookingSummary } from "./index"
import { BookingFormProps } from "./types"

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const BookingForm = ({ service, barbershop, onSubmit }: BookingFormProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetchBookings()
  }, [selectedDay, service.id])

  const timeList = useMemo(() => {
    if (!selectedDay) return []

    return TIME_LIST.filter((time) => {
      const [hour, minutes] = time.split(":").map(Number)
      const timeIsPast = isPast(set(new Date(), { hours: hour, minutes }))

      if (timeIsPast && isToday(selectedDay)) return false

      return !dayBookings.some(
        (booking) =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minutes,
      )
    })
  }, [dayBookings, selectedDay])

  const handleSubmit = async () => {
    if (!selectedDay || !selectedTime) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const bookDate = set(selectedDay, { hours, minutes })

    await onSubmit(bookDate)
  }

  return (
    <SheetContent className="overflow-auto px-0">
      <SheetHeader>
        <SheetTitle className="text-center">Fazer Reserva</SheetTitle>
      </SheetHeader>

      <div className="border-b border-solid py-5">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={selectedDay}
          onSelect={setSelectedDay}
          fromDate={new Date()}
          className="mx-auto w-full"
        />
      </div>

      {selectedDay && (
        <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 px-5 [&::-webkit-scrollbar]:hidden">
          {timeList.length > 0 ? (
            timeList.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))
          ) : (
            <p className="text-xs">Não há horários disponíveis.</p>
          )}
        </div>
      )}

      {selectedDay && selectedTime && (
        <div className="p-5">
          <BookingSummary
            service={{
              ...service,
              price: service.price.toString(),
            }}
            barbershop={barbershop}
            selectedDate={set(selectedDay, {
              hours: Number(selectedTime.split(":")[0]),
              minutes: Number(selectedTime.split(":")[1]),
            })}
          />
        </div>
      )}

      <div className="mt-5 px-5">
        <Button
          onClick={handleSubmit}
          disabled={!selectedDay || !selectedTime}
          className="w-full"
        >
          Confirmar
        </Button>
      </div>
    </SheetContent>
  )
}

export default BookingForm
