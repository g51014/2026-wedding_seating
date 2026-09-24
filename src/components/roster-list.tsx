"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SeatNumber } from "@/components/seat-number"
import { displayGuestName } from "@/data/guests"
import { dietCounts } from "@/data/menu"
import { TABLE_ORDER, isSpareCoverSeat, tableById } from "@/data/venue"
import type { GuestMap } from "@/lib/seating"

type RosterProps = {
  guests: GuestMap
  onSelect: (id: string) => void
}

export function RosterList({ guests, onSelect }: RosterProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 print:grid-cols-2">
      {TABLE_ORDER.map((id) => {
        const table = tableById(id)
        if (!table) return null
        const filled = guests[id].filter(Boolean).length
        const diet = dietCounts(guests[id])
        return (
          <Card
            key={id}
            className="cursor-pointer border-amber-200/80 bg-[#fffaf3] shadow-none"
            onClick={() => onSelect(id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base text-[#7c2d12]">
                  {id === "head" ? "主桌" : `${table.label} 桌`}
                </CardTitle>
              <div className="flex flex-wrap items-center justify-end gap-1">
                <Badge variant="secondary" className="font-normal">
                  {filled}/{table.seats}
                </Badge>
                {table.spareCovers ? (
                  <Badge className="bg-cyan-700 font-normal text-white">
                    移餐 {table.spareCovers} → {table.coverTo} 桌
                  </Badge>
                ) : null}
                {table.coverFrom ? (
                  <Badge variant="outline" className="font-normal text-[#0e7490]">
                    加椅 · 餐自 {table.coverFrom} 桌
                  </Badge>
                ) : null}
                {table.childSeats?.length ? (
                  <Badge className="bg-amber-700 font-normal text-white">
                    兒童座椅 {table.childSeats.length}
                    {table.childSeats.some((name) => name && name !== "兒童座椅")
                      ? ` · ${table.childSeats.filter((name) => name && name !== "兒童座椅").join("、")}`
                      : ""}
                  </Badge>
                ) : null}
              </div>
              </div>
              <p className="text-xs text-[#92400e]">{table.title}</p>
              <p className="text-xs text-muted-foreground">{table.zone}</p>
              {(diet.noBeef > 0 || diet.vegetarian > 0) && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {diet.noBeef > 0 && (
                    <Badge className="bg-pink-300 font-normal text-pink-950">
                      不吃牛 {diet.noBeef}
                    </Badge>
                  )}
                  {diet.vegetarian > 0 && (
                    <Badge className="bg-green-700 font-normal text-white">
                      素食 {diet.vegetarian}
                    </Badge>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <ol className="space-y-1.5 text-sm">
                {guests[id].map((name, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <SeatNumber
                      seat={index + 1}
                      name={name}
                      spare={!name && isSpareCoverSeat(table, guests[id], index + 1)}
                    />
                    <span className={name ? "text-foreground" : "text-muted-foreground"}>
                      {displayGuestName(name) ||
                        (isSpareCoverSeat(table, guests[id], index + 1)
                          ? "空位（移餐）"
                          : table.id === "10"
                            ? "空位（預備）"
                            : "空位")}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
