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
import { deleteBooking } from "@/app/_actions/delete-booking"
import { toast } from "sonner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { cn } from "@/app/_lib/utils"

const BookingDetails = ({
  booking,
  onClose,
}: {
  booking: BookingWithDetails
  onClose?: () => void
}) => {
  const isConfirmed = isFuture(new Date(booking.date))
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      toast("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast("Erro ao cancelar reserva. Tente novamente")
    }
  }

  const renderContent = () => (
    <>
      <div className="relative h-[180px] w-full">
        <Image
          src="/map.png"
          fill
          className="rounded-lg object-cover pt-5"
          alt="Mapa da barbearia"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="text-xs">{booking.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="border-b border-solid py-5">
        <h2 className="pb-2 capitalize">Sobre nós</h2>
        <p className="text-sm text-gray-400">
          {booking.service.barbershop.description}
        </p>
      </div>

      <div className="space-y-3 border-b border-solid py-5">
        <h4 className="text-sm font-bold">Contato</h4>
        {booking.service.barbershop.phones.map((phone, index) => (
          <PhoneItem key={index} phone={phone} />
        ))}
      </div>

      <Badge
        variant={isConfirmed ? "default" : "secondary"}
        className={cn(
          "mb-2 mt-5 w-fit text-sm",
          isConfirmed && "bg-purple-950 text-purple-300",
        )}
      >
        {isConfirmed ? "Confirmado" : "Finalizado"}
      </Badge>

      <div className="space-y-2 rounded-lg border border-solid px-3 py-3">
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

      <div className="flex flex-row justify-between gap-3">
        <Button
          variant="outline"
          className="mt-6 w-full lg:hidden"
          onClick={onClose}
        >
          Voltar
        </Button>
        {isConfirmed && (
          <Dialog>
            <DialogTrigger className="w-full" asChild>
              <Button variant="destructive" className="mt-6 w-full">
                Cancelar Reserva
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                <DialogDescription>
                  Ao cancelar, você perderá sua reserva e não poderá
                  recuperá-la. Essa ação é irreversível.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row gap-3">
                <DialogClose asChild>
                  <Button variant="secondary" className="w-full">
                    Voltar
                  </Button>
                </DialogClose>
                <DialogClose className="w-full">
                  <Button
                    variant="destructive"
                    onClick={handleCancelBooking}
                    className="w-full"
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  )

  return (
    <div className="">
      {onClose ? (
        <div className="space-y-4 rounded-xl px-5 pt-5">{renderContent()}</div>
      ) : (
        <Card className="space-y-4 rounded-xl">
          <CardContent>{renderContent()}</CardContent>
        </Card>
      )}
    </div>
  )
}

export default BookingDetails
