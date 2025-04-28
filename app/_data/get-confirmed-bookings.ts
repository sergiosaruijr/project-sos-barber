"use server"

import { db } from "../_lib/prisma"
import { serializeBooking } from "../_lib/serialize" // Use o arquivo separado

export const getConfirmedBookings = async (userId: string) => {
  if (!userId) return []

  const now = new Date()

  try {
    const bookings = await db.booking.findMany({
      where: {
        userId,
        date: { gt: now },
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
    console.error("Failed to fetch confirmed bookings:", error)
    return []
  }
}
