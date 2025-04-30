import { Prisma } from "@prisma/client"
import { BookingWithDetails } from "../_components/bookings/types"

export type SerializedBooking = {
  id: string
  userId: string
  serviceId: string
  date: string
  createdAt: string
  updatedAt: string
  service: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
    barbershop: {
      id: string
      name: string
      address: string
      imageUrl: string
      phones: string[]
      createdAt: string
      updatedAt: string
      description?: string
    }
  }
}

export const serializeBooking = (
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>,
): SerializedBooking => ({
  ...booking,
  date: booking.date.toISOString(),
  createdAt: booking.createdAt.toISOString(),
  updatedAt: booking.updatedAt.toISOString(),
  service: {
    ...booking.service,
    price: booking.service.price.toString(),
    barbershop: {
      ...booking.service.barbershop,
      createdAt: booking.service.barbershop.createdAt.toISOString(),
      updatedAt: booking.service.barbershop.updatedAt.toISOString(),
      phones: booking.service.barbershop.phones || [],
      description: booking.service.barbershop.description || undefined,
    },
  },
})

export const deserializeBooking = (
  serialized: SerializedBooking,
): BookingWithDetails => ({
  ...serialized,
  date: new Date(serialized.date),
  createdAt: new Date(serialized.createdAt),
  updatedAt: new Date(serialized.updatedAt),
  service: {
    ...serialized.service,
    price: new Prisma.Decimal(serialized.service.price),
    barbershopId: serialized.service.barbershop.id,
    barbershop: {
      ...serialized.service.barbershop,
      description: serialized.service.barbershop.description || "",
      createdAt: new Date(serialized.service.barbershop.createdAt),
      updatedAt: new Date(serialized.service.barbershop.updatedAt),
    },
  },
})
