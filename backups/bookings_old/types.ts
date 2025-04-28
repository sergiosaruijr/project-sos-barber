// import { Prisma, Barbershop, BarbershopService, Booking } from "@prisma/client"

// export type BookingWithDetails = Prisma.BookingGetPayload<{
//   include: {
//     service: { include: { barbershop: true } }
//   }
// }>

// export interface BookingSummaryProps {
//   service: Pick<BarbershopService, "name" | "price" | "imageUrl">
//   barbershop: Pick<Barbershop, "name" | "address">
//   selectedDate: Date
// }

// export interface BookingCardProps {
//   booking: BookingWithDetails
//   variant?: "list" | "details"
//   onClick?: () => void
//   className?: string
// }
