// "use client"

// import { format } from "date-fns"
// import { ptBR } from "date-fns/locale"
// import { BookingCardProps } from "./types"
// import { Card, CardContent } from "../ui/card"
// import { cn } from "@/app/_lib/utils"
// import { Badge } from "../ui/badge"
// import { Avatar, AvatarImage } from "../ui/avatar"

// export const BookingCard = ({
//   booking,
//   variant = "list",
//   onClick,
//   className,
// }: BookingCardProps) => {
//   const isConfirmed = new Date(booking.date) > new Date()

//   return (
//     <Card
//       onClick={onClick}
//       className={cn(
//         variant === "list" && "cursor-pointer hover:bg-gray-50",
//         className,
//       )}
//     >
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
