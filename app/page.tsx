import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import BookingItem from "./_components/bookings/booking-item"

//TODO: receber agendamento como prop
const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  if (!session?.user) {
    return <p>Usuário não autenticado.</p>
  }

  const userId = (session.user as any).id
  const confirmedBookings = await getConfirmedBookings(userId)

  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        {/* Div com imagem de fundo */}
        <div className="-mx-5 gap-8 p-8 md:flex md:bg-black">
          {/* Div lado esquerdo */}
          <div className="flex flex-[1] flex-col justify-between">
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? session.user.name : "bem vindo"}
            </h2>
            <p className="text-white md:-mt-8">
              {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </p>

            {/* Busca */}
            <div className="mt-6">
              <Search />
            </div>

            {/* Busca Rapida */}
            <div className="mt-6 flex gap-3 overflow-x-scroll md:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  className="gap-2"
                  variant="secondary"
                  key={option.title}
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      width={16}
                      height={16}
                      alt={option.title}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            {/* Imagem */}
            <div className="relative mt-6 h-[150px] w-full md:hidden">
              <Image
                src="/banner01.svg"
                alt="Agende nos melhores com SOS Barber"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {/* Agendamento confirmados*/}
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 md:-mb-3 md:block">
                  Agendamentos
                </h2>

                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Lado Direito (Carrossel) */}
          <div className="relative hidden flex-[2] overflow-hidden md:block">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Recomendados
            </h2>
            <div className="scrollbar-hide flex gap-4 overflow-x-auto">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>

            {/* Botão de Navegação */}
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2">
              ➡️
            </button>
          </div>
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
