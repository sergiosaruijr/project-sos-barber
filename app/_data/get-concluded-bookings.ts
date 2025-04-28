"use server"

import { db } from "../_lib/prisma"
import { serializeBooking } from "../_lib/serialize"

export const getConcludedBookings = async (userId: string) => {
  if (!userId) return []

  const now = new Date()
  try {
    const bookings = await db.booking.findMany({
      where: {
        userId,
        date: { lt: now },
      },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
      },
      orderBy: { date: "asc" },
    })

    return bookings.map((booking) => serializeBooking(booking))
  } catch (error) {
    console.error("Failed to fetch concluded bookings:", error)
    return []
  }
}
