// "use client"

// import { Prisma } from "@prisma/client"
// import { Avatar, AvatarImage } from "./ui/avatar"
// import { Badge } from "./ui/badge"
// import { Card, CardContent } from "./ui/card"
// import { format, isFuture } from "date-fns"
// // import { ptBR } from "date-fns/locale"
// import {} from // Sheet,
// // SheetClose,
// // SheetContent,
// // SheetFooter,
// // SheetHeader,
// // SheetTitle,
// // SheetTrigger,
// "./ui/sheet"
// // import Image from "next/image"
// // import PhoneItem from "./phone-item"
// // import { Button } from "./ui/button"
// // import {
// //   Dialog,
// //   DialogClose,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "./ui/dialog"
// // import { deleteBooking } from "../_actions/delete-booking"
// // import { toast } from "sonner"
// // import { useState } from "react"
// import { ptBR } from "date-fns/locale"
// // import BookingSummary from "./booking-summary"

// export interface BookingItemProps {
//   booking: Prisma.BookingGetPayload<{
//     include: {
//       service: {
//         include: {
//           barbershop: true
//         }
//       }
//     }
//   }>
//   onSelect?: () => void
//   className?: string
//   onClick?: () => void
//   variant?: "list" | "details"
// }

// const BookingItem = ({ booking, variant = "list" }: BookingItemProps) => {
//   // const [isSheetOpen, setIsSheetOpen] = useState(false)
//   const isConfirmed = isFuture(new Date(booking.date))

//   if (variant === "details") {
//     return <div className="lg:hidden">{/* Versão mobile (Sheet) */}</div>
//   }

//   return (
//     <Card>
//       <CardContent className="flex justify-between p-0">
//         <div className="flex flex-col gap-2 py-5 pl-5">
//           <Badge variant={isConfirmed ? "default" : "secondary"}>
//             {isConfirmed ? "Confirmado" : "Finalizado"}
//           </Badge>
//           <h3 className="font-semibold">{booking.service.name}</h3>
//           <div className="flex items-center gap-2">
//             <Avatar className="h-6 w-6">
//               <AvatarImage src={booking.service.barbershop.imageUrl} />
//             </Avatar>
//             <p className="text-sm">{booking.service.barbershop.name}</p>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-center border-l px-5">
//           <p className="text-sm capitalize">
//             {format(booking.date, "MMMM", { locale: ptBR })}
//           </p>
//           <p className="text-2xl">{format(booking.date, "dd")}</p>
//           <p className="text-sm">{format(booking.date, "HH:mm")}</p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default BookingItem
