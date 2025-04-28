// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { isFuture } from "date-fns"
// import Header from "../_components/header"
// import BookingItem, { BookingItemProps } from "../_components/booking-item"
// import { BookingDetails } from "./booking-detail"

// type BookingsClientProps = {
//   confirmedBookings: BookingItemProps["booking"][]
//   concludedBookings: BookingItemProps["booking"][]
// }

// const BookingsClient = ({
//   confirmedBookings,
//   concludedBookings,
// }: BookingsClientProps) => {
//   const allBookings = useMemo(
//     () => [...confirmedBookings, ...concludedBookings],
//     [confirmedBookings, concludedBookings],
//   )
//   const [isClient, setIsClient] = useState(false)

//   const [selectedBooking, setSelectedBooking] = useState(
//     allBookings.find((b) => isFuture(new Date(b.date))) || allBookings[0],
//   )
//   console.log("Selected Booking:", selectedBooking)
//   useEffect(() => {
//     setIsClient(true)
//     setSelectedBooking(confirmedBookings[0] || concludedBookings[0] || null)
//   }, [])

//   useEffect(() => {
//     if (allBookings.length > 0 && !selectedBooking) {
//       setSelectedBooking(allBookings[0])
//     }
//   }, [allBookings, selectedBooking])

//   if (!isClient) return null

//   return (
//     <div className="bg-red-50 p-4">
//       {" "}
//       {/* Forçar fundo visível */}
//       <Header />
//       {/* Debug simplificado */}
//       <div className="mb-4 bg-yellow-100 p-2">
//         <p>
//           Dados recebidos: {confirmedBookings.length + concludedBookings.length}{" "}
//           agendamentos
//         </p>
//       </div>
//       {/* Renderização forçada SEM lógica condicional */}
//       <div className="flex flex-col gap-4 lg:flex-row">
//         <div className="w-full space-y-3 lg:w-1/2">
//           <h2 className="text-xs font-bold uppercase text-gray-400">
//             Confirmados
//           </h2>
//           {confirmedBookings.map((booking) => (
//             <div
//               key={booking.id}
//               className="cursor-pointer"
//               onClick={() => setSelectedBooking(booking)}
//             >
//               <BookingItem booking={booking} variant="list" />
//             </div>
//           ))}

//           <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
//             Finalizados
//           </h2>
//           {concludedBookings.map((booking) => (
//             <div
//               key={booking.id}
//               className="cursor-pointer"
//               onClick={() => setSelectedBooking(booking)}
//             >
//               <BookingItem booking={booking} variant="list" />
//             </div>
//           ))}
//         </div>

//         {/* COLUNA DIREITA - DETALHES (SEM CARD) */}
//         <div className="w-full lg:sticky lg:top-4 lg:h-fit lg:w-1/2">
//           {selectedBooking ? (
//             <div className="rounded-lg bg-gray-50 p-4">
//               <BookingDetails booking={selectedBooking} />
//             </div>
//           ) : (
//             <div className="flex h-64 items-center justify-center">
//               <p className="text-gray-500">Selecione um agendamento</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingsClient
