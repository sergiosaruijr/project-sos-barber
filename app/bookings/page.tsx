import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { BookingsClient } from "../_components/bookings/index"
import { deserializeBooking } from "../_lib/serialize"
export const dynamic = "force-dynamic"

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <p>Usuário não autenticado.</p>
  }

  const userId = (session.user as any).id // Pega o ID do usuário autenticado

  try {
    const [confirmed, concluded] = await Promise.all([
      getConfirmedBookings(userId)
        .then((bookings) => bookings.map(deserializeBooking))
        .catch(() => []),
      getConcludedBookings(userId)
        .then((bookings) => bookings.map(deserializeBooking))
        .catch(() => []),
    ])

    console.log("Confirmed:", confirmed) // Debug
    console.log("Concluded:", concluded) // Debug

    return (
      <BookingsClient
        confirmedBookings={confirmed}
        concludedBookings={concluded}
      />
    )
  } catch (error) {
    console.error("Booking load error:", error)
    console.error("Booking load error:", error)
    return (
      <div className="p-5">
        <p className="text-red-500">Erro ao carregar agendamentos</p>
        <pre className="text-xs">{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }
}

export default Bookings
