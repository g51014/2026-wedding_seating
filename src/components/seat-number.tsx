import { isNoBeef, isVegetarian } from "@/data/guests"
import { cn } from "@/lib/utils"

type SeatNumberProps = {
  seat: number
  name?: string
  spare?: boolean
  className?: string
}

export function SeatNumber({ seat, name = "", spare = false, className }: SeatNumberProps) {
  const veg = isVegetarian(name)
  const noBeef = isNoBeef(name)
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
        seat === 1
          ? "bg-rose-600 text-white"
          : veg
            ? "bg-green-700 text-white"
            : noBeef
              ? "bg-pink-300 text-pink-950"
              : spare
                ? "bg-cyan-700 text-white"
                : "bg-amber-100 text-amber-900",
        className
      )}
    >
      {seat}
    </span>
  )
}
