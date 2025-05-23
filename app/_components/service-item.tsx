"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import SignInDialog from "./sign-in-dialog"
import { Dialog, DialogContent } from "./ui/dialog"
// import BookingSummary from "./booking-summary"
import { useRouter } from "next/navigation"
import { BookingSummary } from "../_components/bookings/index"
import { useMediaQuery } from "../_hooks/use-media-query"
import { Check } from "lucide-react"
interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name" | "address">
}

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

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  const timelist = TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
  return timelist
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const isMobile = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelected = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      handleBookingSheetOpenChange()

      if (isMobile) {
        toast.success("Reserva criada com sucesso!", {
          action: {
            label: "Ver Agendamentos",
            onClick: () => router.push("/bookings"),
          },
        })
      } else {
        setShowSuccessDialog(true)
      }
    } catch (error) {
      toast.error("Erro ao criar reserva!")
    }
  }
  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* Imagem */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              fill
              alt={service.name}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Direita */}
          <div className="w-full space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            {/* Preço e Botão*/}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="overflow-auto px-0 sm:max-w-sm">
                  <SheetHeader>
                    <SheetTitle className="text-center">
                      Fazer Reserva
                    </SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      // fromDate={addDays(new Date(), 1)}
                      fromDate={new Date()}
                      className="mx-auto w-full"
                      classNames={{
                        day: "h-9 w-9 p-0 font-normal text-sm aria-selected:opacity-100 bg-transparent text-inherit focus:outline-none focus:ring-0 focus-visible:ring-0 focus:bg-transparent focus:text-inherit",
                      }}
                      styles={{
                        head_cell: {
                          textTransform: "capitalize",
                          textAlign: "center",
                          width: "14.28%",
                        },
                        caption: {
                          textTransform: "capitalize",
                          textAlign: "center",
                          fontSize: "1rem",
                        },
                        cell: {
                          minWidth: "40px",
                          textAlign: "center",
                          width: "14.28%",
                        },
                        table: {
                          width: "100%",
                          tableLayout: "fixed",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 px-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelected(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">Não há horários disponíveis.</p>
                      )}
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={{
                          ...service,
                          price: service.price.toString(), // Conversão explícita
                        }}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="mt-5 w-full px-5">
                    {/* <SheetClose asChild> */}
                    <Button
                      type="submit"
                      onClick={handleCreateBooking}
                      disabled={!selectedDay && !selectedTime}
                      className="w-full"
                    >
                      Confirmar
                    </Button>
                    {/* </SheetClose> */}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>

      {!isMobile && showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-[300px] max-w-md flex-col items-center rounded-xl bg-zinc-900 p-6 text-center shadow-xl">
            <div className="my-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500">
              <Check className="h-8 w-8 text-black" strokeWidth={3} />
            </div>
            <h2 className="mb-1 text-xl font-semibold">Reserva Efetuada!</h2>
            <p className="mb-5 text-base text-gray-500">
              Sua reserva foi agendada com sucesso.
            </p>
            <div className="flex w-full flex-col gap-4">
              <Button
                className="bg-zinc-700 font-bold hover:bg-zinc-800"
                onClick={() => router.push("/bookings")}
              >
                Ver Agendamentos
              </Button>
              <Button
                className="bg-zinc-700 font-bold hover:bg-zinc-800"
                onClick={() => setShowSuccessDialog(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ServiceItem
