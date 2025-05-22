import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
  return (
    <div>
      <Header />
      <div className="my-10 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-5 mt-6 text-xs font-bold uppercase text-gray-400 md:text-base md:text-gray-300">
          Resultados para &quot;{searchParams.title || searchParams.service}
          &quot;
        </h2>

        <div className="mb-14 flex flex-wrap gap-4">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
