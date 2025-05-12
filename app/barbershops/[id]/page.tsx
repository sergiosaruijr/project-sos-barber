import AvailableTimes from "@/app/_components/available-times"
import Header from "@/app/_components/header"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SiderbarSheet from "@/app/_components/siderbar-sheet"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
// import { format } from "date-fns"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    // <div className="p-5 md:grid md:grid-cols-[2fr_1fr] md:gap-8"></div>
    // verificar se vou usar p-5 msm pra versão mobile
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="grid grid-cols-1 pb-24 md:gap-10 md:px-16 md:pt-10 xl:grid-cols-[2fr_1fr] xl:px-32">
        {/* Esquerda */}
        <div className="">
          {/* Imagem */}
          <div className="relative h-[250px] w-full md:h-[487px]">
            <Image
              alt={barbershop.name}
              src={barbershop.imageUrl || "/default-image.png"}
              fill
              className="object-cover md:rounded"
            />
            <Button
              size="icon"
              variant="secondary"
              className="bg absolute left-4 top-4"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4 md:hidden"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SiderbarSheet />
            </Sheet>
          </div>

          <div className="flex flex-row justify-between border-b border-solid p-5">
            <div className="flex flex-col">
              <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
              <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
              </div>
            </div>

            <div className="mt-0 flex flex-col items-center md:rounded-md md:bg-zinc-800 md:p-1 md:px-2 md:py-[10px]">
              <div className="flex gap-1.5">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">5,0 </p>
              </div>
              <p className="mt-1.5 text-xs text-gray-500">889 avaliações</p>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-3 border-b border-solid p-5 md:hidden">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          {/* Serviços */}
          <div className="space-y-3 border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={JSON.parse(JSON.stringify(service))}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                />
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-3 p-5 md:hidden">
            {barbershop.phones.map((phone) => (
              <PhoneItem phone={phone} key={phone} />
            ))}
          </div>
        </div>

        {/* Direita */}
        <Card className="hidden self-start xl:block">
          <CardContent>
            <div className="relative mt-6 flex h-[180px] w-full items-end">
              <Image
                src="/map.png"
                fill
                className="rounded-xl object-cover"
                alt={`Mapa da barbearia ${barbershop.name}`}
              />

              <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{barbershop.name}</h3>
                    <p className="text-xs">{barbershop.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              {/* <div className="mb-3 mt-6">
                <BookingSummary
                  barbershop={barbershop}
                  service={booking.service}
                  selectedDate={booking.date}
                />
              </div> */}
              <div className="space-y-3 border-b border-solid pb-5">
                <h2 className="text-sm font-bold uppercase text-gray-200">
                  Sobre nós
                </h2>
                <p className="text-justify text-sm text-gray-400">
                  {barbershop?.description}
                </p>
              </div>

              <div className="space-y-3 border-b border-solid py-5">
                {barbershop.phones.map((phone, index) => (
                  <PhoneItem key={index} phone={phone} />
                ))}
              </div>

              <div className="border-b border-solid">
                <AvailableTimes />
              </div>

              <div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-sm">Em parceia com</p>
                  <Image
                    alt="SOS Barber"
                    src="/logo.png"
                    height={18}
                    width={120}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BarbershopPage
