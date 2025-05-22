const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    await prisma.barbershopService.deleteMany({})
    await prisma.barbershop.deleteMany({})

    const images = [
      "https://images.unsplash.com/photo-1592647420148-bfcc177e2117?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1533245270348-821d4d5c7514?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", //teste
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1661849817260-55bfa0927e4d?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1628274459813-74bc7e2c53b2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1638383257653-4217e9161b11?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1633121050918-ab208f1508b7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1695173122226-3a932002ab33?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1675599194044-0bedc2546a34?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1635273051427-7c2a35ce50ce?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png",
      "https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png",
      "https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png",
      "https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png",
      "https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png",
      "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
      "https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png",
      "https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png",
    ]
    // Nomes criativos para as barbearias
    const creativeNames: BarbershopName[] = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ]
    //Descrições para barbearias
    const descriptions = {
      "Barbearia Vintage":
        "Especializada em cortes clássicos e atendimento acolhedor, a Barbearia Vintage traz o charme do passado com técnicas tradicionais que nunca saem de moda. Aqui, cada detalhe remete à elegância dos tempos antigos, com cadeiras de couro, decoração retrô e um ambiente pensado para reviver a verdadeira essência da barbearia clássica. Um lugar perfeito para quem busca qualidade aliada à nostalgia.",
      "Corte & Estilo":
        "Aqui, estilo e precisão se unem para entregar cortes modernos e personalizados que realçam sua identidade. Nossa equipe está sempre atualizada com as últimas tendências para oferecer desde um corte mais clássico até os visuais mais arrojados, tudo com atendimento dedicado para garantir que você saia satisfeito e confiante.",
      "Barba & Navalha":
        "A tradição da barbearia clássica com serviços impecáveis de barbearia para um visual sempre renovado. Utilizamos técnicas manuais com navalha, proporcionando um acabamento perfeito e uma experiência de cuidado que vai além do simples corte, valorizando o estilo e a personalidade de cada cliente.",
      "The Dapper Den":
        "Um espaço sofisticado para homens que valorizam elegância e cuidado detalhado. Com um ambiente exclusivo e atendimento personalizado, oferecemos cortes refinados, tratamentos capilares e uma seleção especial de produtos premium para garantir que você esteja sempre no seu melhor.",
      "Cabelo & Cia.":
        "Diversidade de serviços para cuidar do seu cabelo com qualidade e estilo. Desde cortes masculinos e femininos até tratamentos especiais, nossa barbearia é um espaço versátil que atende a todos os gostos e necessidades, sempre com profissionais qualificados e equipamentos modernos.",
      "Machado & Tesoura":
        "Cortes fortes e marcantes, feitos com técnica e atenção a cada detalhe. Aqui, o foco está em transformar sua imagem com visuais impactantes que refletem atitude e personalidade, seja para um estilo clássico ou contemporâneo, tudo realizado com ferramentas de alta qualidade e paixão pelo ofício.",
      "Barbearia Elegance":
        "Ambiente refinado e cortes com design exclusivo para quem busca excelência. Nossa missão é proporcionar uma experiência premium, combinando técnicas avançadas de barbearia com um atendimento impecável, onde cada cliente é tratado com o máximo respeito e cuidado.",
      "Aparência Impecável":
        "Serviços que garantem um visual sempre alinhado e impecável para todas as ocasiões. Seja para o dia a dia ou eventos especiais, nossa equipe dedica atenção especial aos detalhes para que você esteja sempre com a aparência perfeita, unindo estilo, conforto e modernidade.",
      "Estilo Urbano":
        "Inspiração urbana para cortes modernos, com personalidade e atitude. Aqui, a vibe da cidade se reflete em cortes descolados, designs arrojados e um ambiente jovem, onde a criatividade e a liberdade de expressão são valorizadas para criar visuais autênticos e cheios de estilo.",
      "Estilo Clássico":
        "Resgatando o clássico com técnicas tradicionais e um toque de modernidade. Essa barbearia é o lugar ideal para quem valoriza a tradição aliada à inovação, oferecendo cortes que atravessam gerações com elegância, além de um atendimento que faz você se sentir em casa.",
    } as const
    type BarbershopName = keyof typeof descriptions
    // Endereços fictícios para as barbearias
    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ]

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ]

    // Criar 10 barbearias com nomes e endereços fictícios
    const barbershops = []
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]
      const imageUrl = images[i]
      const description = descriptions[name]

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
          phones: ["(11) 99999-9999", "(11) 99999-9999"],
          description,
        },
      })

      for (const service of services) {
        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        })
      }

      barbershops.push(barbershop)
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect()
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error)
  }
}

seedDatabase()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
