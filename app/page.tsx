import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
// import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import BookingItem from "./_components/bookings/booking-item"
import HorizontalCarousel from "./_components/horizontal-carousel"

//TODO: receber agendamento como prop
const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const recentBarbershops = await db.barbershop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  // if (!session?.user) {
  //   return <p>Usuário não autenticado.</p>
  // }

  const userId = (session?.user as any)?.id
  const confirmedBookings = userId ? await getConfirmedBookings(userId) : []

  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5 md:p-0">
        {/* Div com imagem de fundo */}
        <div className="w-full md:flex md:bg-black">
          {/* conteúdo da div */}
          <div className="w-full gap-8 overflow-x-hidden md:ml-20 md:mr-20 md:flex md:bg-black md:pb-16 md:pt-16">
            {/* Div lado esquerdo */}
            <div className="flex min-w-0 flex-[1] flex-col">
              <h2 className="text-xl font-bold md:mb-3">
                Olá, {session?.user ? session.user.name : "bem vindo"}
              </h2>
              <p className="text-white">
                {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </p>
              {/* Busca */}
              <div className="mt-6 max-w-2xl md:mb-3">
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
                  <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 md:block">
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
            <div className="relative hidden min-w-0 overflow-hidden md:block md:flex-1">
              <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
                Recomendados
              </h2>
              <HorizontalCarousel items={barbershops} />
            </div>
          </div>
        </div>

        <div className="md:mb-20 md:ml-20 md:mr-20">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Mais recentes
          </h2>
          <HorizontalCarousel items={recentBarbershops} />

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <HorizontalCarousel items={popularBarbershops} />
        </div>
      </div>
    </div>
  )
}

export default Home
