import { Prisma } from "@prisma/client"

export type SerializedBooking = {
  id: string
  date: string // ISO string
  service: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string // Convertido para string
    barbershop: {
      id: string
      name: string
      address: string
      imageUrl: string
      phones: string[]
    }
  }
}

export const serializeBooking = (
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>,
): SerializedBooking => ({
  id: booking.id,
  date: booking.date.toISOString(),
  service: {
    id: booking.service.id,
    name: booking.service.name,
    description: booking.service.description,
    imageUrl: booking.service.imageUrl,
    price: booking.service.price.toString(),
    barbershop: {
      id: booking.service.barbershop.id,
      name: booking.service.barbershop.name,
      address: booking.service.barbershop.address,
      imageUrl: booking.service.barbershop.imageUrl,
      phones: booking.service.barbershop.phones || [],
    },
  },
})
