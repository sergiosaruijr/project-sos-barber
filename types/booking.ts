export type Booking = {
  id: string
  date: string
  service: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    barbershop: {
      id: string
      name: string
      address: string
      phones: string[]
    }
  }
}
