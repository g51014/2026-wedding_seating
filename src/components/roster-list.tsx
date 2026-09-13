"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
                  {filled}/10
                </Badge>
              </div>
              <p className="text-xs text-[#92400e]">{table.zone}</p>
            </CardHeader>
            <CardContent>
              <ol className="space-y-1 text-sm">
                {guests[id].map((name, index) => (
                  <li key={index} className="flex gap-2">
                    <span
                      className={`w-10 shrink-0 font-medium ${
                        index === 0 ? "text-rose-700" : "text-amber-800"
                      }`}
                    >
                      {index + 1}號
                    </span>
                    <span className={name ? "text-foreground" : "text-muted-foreground"}>
                      {name || "空位"}
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
