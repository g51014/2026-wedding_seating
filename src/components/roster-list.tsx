"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SeatNumber } from "@/components/seat-number"
import { displayGuestName } from "@/data/guests"
import { TABLE_ORDER, tableById } from "@/data/venue"
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
                <Badge variant="secondary" className="font-normal">
                  {filled}/{table.seats}
                </Badge>
              </div>
              <p className="text-xs text-[#92400e]">{table.title}</p>
              <p className="text-xs text-muted-foreground">{table.zone}</p>
            </CardHeader>
            <CardContent>
              <ol className="space-y-1.5 text-sm">
                {guests[id].map((name, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <SeatNumber seat={index + 1} name={name} />
                    <span className={name ? "text-foreground" : "text-muted-foreground"}>
                      {displayGuestName(name) || "空位"}
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
