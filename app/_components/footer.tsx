import { Card, CardContent } from "./ui/card"

export const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p>
            © 2023 Copyright{" "}
            <span className="text-sm font-bold text-gray-400">SOS Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
