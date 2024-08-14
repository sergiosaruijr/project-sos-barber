import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SiderbarSheet from "./siderbar-sheet"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="SOS Barber" src="/logo.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SiderbarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
