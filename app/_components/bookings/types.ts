// import { Prisma, Barbershop, BarbershopService } from "@prisma/client"
import { Prisma } from "@prisma/client"

export type BookingWithDetails = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: {
          select: {
            id: true
            name: true
            address: true
            imageUrl: true
            phones: true
            createdAt?: true
            updatedAt?: true
            description?: true
          }
        }
      }
    }
  }
}> & {
  service: {
    price: Prisma.Decimal
    barbershop: {
      createdAt?: Date | string
      updatedAt?: Date | string
      description?: string
    }
  }
}

export interface BookingsClientProps {
  confirmedBookings: BookingWithDetails[]
  concludedBookings: BookingWithDetails[]
}

export interface BookingSummaryProps {
  service: {
    id: string
    name: string
    price: string
    imageUrl: string
    description?: string
  }
  barbershop: {
    name: string
    address: string
  }
  selectedDate: Date
}

export interface BookingCardProps {
  booking: BookingWithDetails
  variant?: "list" | "details"
  onClick?: () => void
  className?: string
}

export interface BookingsClientProps {
  confirmedBookings: BookingWithDetails[]
  concludedBookings: BookingWithDetails[]
}

export interface BookingFormProps {
  service: {
    id: string
    name: string
    price: string
    imageUrl: string
  }
  barbershop: {
    name: string
    address: string
  }
  // eslint-disable-next-line no-unused-vars
  onSubmit: (_date: Date) => Promise<void>
}
