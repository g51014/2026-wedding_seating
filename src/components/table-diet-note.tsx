import { SeatNumber } from "@/components/seat-number"
import {
  dietGuestsFromNames,
  LAZY_SUSAN_BEEF,
  PLATED_BEEF,
} from "@/data/menu"

type TableDietNoteProps = {
  guests: string[]
}

function GuestList({ guests }: { guests: { seat: number; name: string; displayName: string }[] }) {
  return (
    <ul className="mt-1 space-y-1">
      {guests.map((guest) => (
        <li key={`${guest.seat}-${guest.name}`} className="flex items-center gap-2">
          <SeatNumber seat={guest.seat} name={guest.name} className="size-5 text-[10px]" />
          <span>{guest.displayName}</span>
        </li>
      ))}
    </ul>
  )
}

export function TableDietNote({ guests }: TableDietNoteProps) {
  const diets = dietGuestsFromNames(guests)
  const vegetarian = diets.filter((guest) => guest.kind === "vegetarian")
  const noBeef = diets.filter((guest) => guest.kind === "no-beef")

  if (diets.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-amber-200 bg-[#fffdf8] px-3 py-2 text-xs text-[#92400e]">
        本桌無需改菜
      </p>
    )
  }

  return (
    <div className="space-y-2 rounded-lg border border-amber-200 bg-[#fffdf8] px-3 py-2 text-xs leading-relaxed text-[#7c2d12]">
      <p className="font-medium text-[#7c2d12]">本桌需改菜</p>
      {noBeef.length > 0 && (
        <div>
          <p>
            不吃牛 {noBeef.length} 人：{LAZY_SUSAN_BEEF.nameZh}自行不取；
            {PLATED_BEEF.nameZh}改 {noBeef.length} 份。
          </p>
          <GuestList guests={noBeef} />
        </div>
      )}
      {vegetarian.length > 0 && (
        <div>
          <p>素食 {vegetarian.length} 人：請出整套素食位上（迎賓小碟與甜點可共用）。</p>
          <GuestList guests={vegetarian} />
        </div>
      )}
    </div>
  )
}
