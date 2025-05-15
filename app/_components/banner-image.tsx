import Image from "next/image"

export function BannerImage({ className }: { className?: string }) {
  return (
    <div className={`relative mt-6 h-[150px] w-full max-w-2xl ${className}`}>
      <Image
        src="/banner01.svg"
        alt="Agende nos melhores com SOS Barber"
        fill
        className="rounded-xl object-cover"
      />
    </div>
  )
}
