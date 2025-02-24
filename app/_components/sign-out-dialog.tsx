"use client"

import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

type SignOutDialogProps = {
  closeModal: () => void // Função que não retorna nada (void)
}

const SignOutDialog = ({ closeModal }: SignOutDialogProps) => {
  //   const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut({ callbackUrl: "/" })

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex justify-center">Sair</DialogTitle>
        <DialogDescription className="flex justify-center">
          Deseja sair da plataforma?
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between gap-2">
        <Button
          variant="outline"
          className="w-full gap-1 bg-gray-700 font-bold"
          onClick={closeModal}
        >
          {/* <Image
            src="/google.svg"
            alt="Fazer login com o Google"
            width={18}
            height={18}
            /> */}
          Cancelar
        </Button>

        <Button
          variant="outline"
          className="w-full gap-1 bg-red-500 font-bold"
          onClick={handleLogoutClick}
        >
          {/* <Image
            src="/google.svg"
            alt="Fazer login com o Google"
            width={18}
            height={18}
            /> */}
          Sair
        </Button>
      </div>
    </>
  )
}

export default SignOutDialog
