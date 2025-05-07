"use client"

import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BookingWithDetails } from "./types"

interface BookingItemProps {
  booking: BookingWithDetails
  variant?: "list" | "details"
  className?: string
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(new Date(booking.date))

  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="flex min-w-[200px] flex-col gap-2 py-5 pl-5">
          <Badge
            variant={isConfirmed ? "default" : "secondary"}
            className="w-fit"
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l px-5">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
