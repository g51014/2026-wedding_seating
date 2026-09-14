"use client"

import { Input } from "@/components/ui/input"
import { tableById } from "@/data/venue"
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
  const seats = table.seats

  return (
    <div className="space-y-4">
      <div>
        <p className="font-heading text-lg text-[#7c2d12]">
          {table.id === "head" ? "主桌" : `${table.label} 桌`}
        </p>
        <p className="text-sm text-[#92400e]">{table.title}</p>
        <p className="text-xs text-[#92400e]">
          {table.zone}
          {table.diet ? ` · ${table.diet}` : ""}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          紅點為 1 號位（近舞台左上），其餘順時針。主桌 12 席，其餘 10 席。
        </p>
      </div>

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
          const veg = (guests[i] ?? "").includes("素食")
          const noBeef = (guests[i] ?? "").includes("不吃牛")
          return (
            <li key={seat} className="flex items-center gap-2">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  seat === 1
                    ? "bg-rose-600 text-white"
                    : veg
                      ? "bg-green-700 text-white"
                      : noBeef
                        ? "bg-pink-300 text-pink-950"
                        : "bg-amber-100 text-amber-900"
                }`}
              >
                {seat}
              </span>
              <Input
                value={guests[i] ?? ""}
                placeholder={`${seat} 號位`}
                onChange={(e) => onChange(seat, e.target.value)}
                className="h-8 bg-white"
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
