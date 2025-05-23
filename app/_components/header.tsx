"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
// import { LogInIcon, MenuIcon } from "lucide-react"
import { CalendarIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SiderbarSheet from "./siderbar-sheet"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useState } from "react"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog" // Importando o SignInDialog
import SignOutDialog from "./sign-out-dialog"

const Header = () => {
  const { data: session, status } = useSession()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const openLogoutModal = () => setIsLogoutModalOpen(true)
  const closeLogoutModal = () => setIsLogoutModalOpen(false)

  // const handleProfileClick = () => {
  //   if (!session?.user) {
  //     setIsDialogOpen(true)
  //   }
  // }

  // const handleSignOut = () => {
  //   signOut({ callbackUrl: "/" }) // Redireciona para a página inicial após o logout
  // }
  console.log("🔥Sessão retornada:", session)
  return (
    <>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-10 md:ml-11 md:mr-11 lg:px-8">
          <Link href="/">
            <Image alt="SOS Barber" src="/logo.png" height={18} width={120} />
          </Link>

          <div className="hidden space-x-6 md:flex">
            {/* Se não estiver logado, exibe um botão que abre o modal */}
            {status === "loading" ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
            ) : !session?.user ? (
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(true)}
                className="hover:text-gray-500"
              >
                Perfil
              </Button>
            ) : (
              <div className="flex w-full items-center justify-between gap-5">
                <Link href="/bookings" className="hover:text-gray-400">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={18} />
                    Agendamentos
                  </div>
                </Link>

                <div
                  onClick={openLogoutModal}
                  className="flex cursor-pointer items-center gap-2 hover:text-gray-400"
                >
                  <div className="rounded-full bg-gray-800 p-1">
                    <Avatar>
                      <AvatarImage
                        src={session.user.image ?? "/default-avatar.png"}
                        width={40}
                        height={40}
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                  <span>{session.user.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="">
                  <MenuIcon />
                </Button>
              </SheetTrigger>

              <SiderbarSheet />
            </Sheet>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <SignInDialog />
        </DialogContent>
      </Dialog>

      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent>
          <SignOutDialog closeModal={closeLogoutModal} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Header
