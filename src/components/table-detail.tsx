"use client"

import { Input } from "@/components/ui/input"
import { displayGuestName, isNoBeef, isVegetarian } from "@/data/guests"
import { extraChairCount, isSpareCoverSeat, tableById } from "@/data/venue"
import { RoundTable } from "@/components/round-table"
import { SeatNumber } from "@/components/seat-number"
import { TableDietNote } from "@/components/table-diet-note"

type TableDetailProps = {
  tableId: string
  guests: string[]
  onChange: (seat: number, name: string) => void
}

export function TableDetail({ tableId, guests, onChange }: TableDetailProps) {
  const table = tableById(tableId)
  if (!table) return null

  const preview = { ...table, x: 160, y: 160 }
  const seats = table.seats

  return (
    <div className="space-y-4">
      <div>
        <p className="font-heading text-lg text-[#7c2d12]">
          {table.id === "head" ? "主桌" : `${table.label} 桌`}
        </p>
        <p className="text-sm text-[#92400e]">{table.title}</p>
        <p className="text-xs text-[#92400e]">{table.zone}</p>
        {table.spareCovers && table.coverTo ? (
          <p className="mt-1 text-xs text-cyan-800">
            本桌空 {table.spareCovers} 席列為移餐額度：餐具移給 {table.coverTo} 桌加椅，不另收費。
          </p>
        ) : null}
        {table.coverFrom ? (
          <p className="mt-1 text-xs text-cyan-800">
            超額 {extraChairCount(table)} 席：餐具由 {table.coverFrom} 桌空位調配。
          </p>
        ) : null}
        {table.id === "10" ? (
          <p className="mt-1 text-xs text-[#92400e]">整桌預備，空位不列入移餐額度。</p>
        ) : null}
        {table.id === "9" || table.id === "5" ? (
          <p className="mt-1 text-xs text-[#92400e]">另 1 席空位保留給本桌，不移餐。</p>
        ) : null}
        <p className="mt-1 text-xs text-muted-foreground">
          紅點為 1 號位（近舞台左上），其餘順時針。主桌 12 席，其餘原則 10 席。
        </p>
      </div>
      <TableDietNote guests={guests} />

      <svg viewBox="0 0 320 340" className="mx-auto h-auto w-full max-w-[320px]">
        <circle cx="160" cy="160" r="150" fill="#f8ead0" />
        <RoundTable
          table={preview}
          guests={guests}
          radius={table.id === "head" ? 42 : 48}
          chairRadius={table.id === "head" ? 72 : 78}
          selected
          showNames
          nameSize={8}
        />
      </svg>

      <ol className="grid grid-cols-1 gap-2">
        {Array.from({ length: seats }, (_, i) => {
          const seat = i + 1
          const name = guests[i] ?? ""
          const spare = !name && isSpareCoverSeat(table, guests, seat)
          return (
            <li key={seat} className="flex items-center gap-2">
              <SeatNumber seat={seat} name={name} spare={spare} />
              <Input
                value={displayGuestName(name)}
                placeholder={
                  spare ? `${seat} 號位（移餐）` : table.id === "10" ? `${seat} 號位（預備）` : `${seat} 號位`
                }
                onChange={(e) => {
                  const next = displayGuestName(e.target.value)
                  if (!next) {
                    onChange(seat, "")
                    return
                  }
                  const diet = isVegetarian(name)
                    ? "·素食"
                    : isNoBeef(name)
                      ? "·不吃牛"
                      : ""
                  onChange(seat, next + diet)
                }}
                className="h-8 bg-white"
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
