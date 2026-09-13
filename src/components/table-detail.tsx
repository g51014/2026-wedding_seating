"use client"

import { Input } from "@/components/ui/input"
import { SEAT_COUNT, seatPoint, tableById } from "@/data/venue"
import { RoundTable } from "@/components/round-table"

type TableDetailProps = {
  tableId: string
  guests: string[]
  onChange: (seat: number, name: string) => void
}

export function TableDetail({ tableId, guests, onChange }: TableDetailProps) {
  const table = tableById(tableId)
  if (!table) return null

  const preview = { ...table, x: 160, y: 160 }

  return (
    <div className="space-y-4">
      <div>
        <p className="font-heading text-lg text-[#7c2d12]">
          {table.id === "head" ? "主桌" : `${table.label} 桌`}
        </p>
        <p className="text-sm text-[#92400e]">{table.zone}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          紅點為 1 號位（近舞台左上），其餘順時針排列。點座位或下方欄位即可填入賓客姓名。
        </p>
      </div>

      <svg viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-[320px]">
        <circle cx="160" cy="160" r="150" fill="#f8ead0" />
        <RoundTable
          table={preview}
          guests={guests}
          radius={48}
          chairRadius={78}
          selected
          showNames
          nameSize={9}
        />
      </svg>

      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {Array.from({ length: SEAT_COUNT }, (_, i) => {
          const seat = i + 1
          const point = seatPoint(0, 0, 1, seat)
          const clock = clockLabel(seat)
          return (
            <li key={seat} className="flex items-center gap-2">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  seat === 1 ? "bg-rose-600 text-white" : "bg-amber-100 text-amber-900"
                }`}
              >
                {seat}
              </span>
              <Input
                value={guests[i]}
                placeholder={`${seat} 號位 · ${clock}`}
                onChange={(e) => onChange(seat, e.target.value)}
                className="h-8 bg-white"
              />
              <span className="sr-only">
                方位 {point.x.toFixed(2)}, {point.y.toFixed(2)}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function clockLabel(seat: number) {
  const labels = [
    "近舞台左上",
    "正對舞台",
    "舞台右上",
    "右側前方",
    "右側後方",
    "背對舞台",
    "左後外側",
    "左側後方",
    "左側前方",
    "左上內側",
  ]
  return labels[seat - 1]
}
