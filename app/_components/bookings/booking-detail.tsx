"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { isFuture } from "date-fns"
import Image from "next/image"
import { BookingWithDetails } from "./types"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import PhoneItem from "../phone-item"
import { Button } from "../ui/button"

const BookingDetails = ({ booking }: { booking: BookingWithDetails }) => {
  const isConfirmed = isFuture(new Date(booking.date))

  return (
    <div>
      {/* <Header /> */}
      <div className="space-y-6">
        <div className="relative h-[180px] w-full">
          <Image
            src="/map.png"
            fill
            className="rounded-lg object-cover"
            alt="Mapa da barbearia"
          />
          <div className="absolute bottom-4 left-4 right-4">
            <Card>
              <CardContent className="flex items-center gap-3 p-3">
                <Avatar>
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">
                    {booking.service.barbershop.name}
                  </h3>
                  <p className="text-xs">
                    {booking.service.barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Badge
          variant={isConfirmed ? "default" : "secondary"}
          className="w-fit"
        >
          {isConfirmed ? "Confirmado" : "Finalizado"}
        </Badge>

        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-gray-500">Serviço</p>
            <p>{booking.service.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Data</p>
            <p>{format(booking.date, "dd/MM/yyyy", { locale: ptBR })}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Horário</p>
            <p>{format(booking.date, "HH:mm", { locale: ptBR })}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold">Contato</h4>
          {booking.service.barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
          <p>teste</p>
        </div>

        {isConfirmed && (
          <Button variant="destructive" className="mt-6 w-full">
            Cancelar Reserva
          </Button>
        )}
      </div>
    </div>
  )
}

export default BookingDetails
