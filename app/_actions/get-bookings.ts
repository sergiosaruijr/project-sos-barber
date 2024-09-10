'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { db } from '../_lib/prisma'

interface getBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({date}: getBookingsProps) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      }
    }
  })
  return bookings
}