"use client"

import type { PointerEvent } from "react"

import { LAYOUT, TABLES, type TableDef } from "@/data/venue"
import { RoundTable } from "@/components/round-table"
import type { GuestMap } from "@/lib/seating"

const HIT_RADIUS = 30

type FloorPlanProps = {
  guests: GuestMap
  selectedId: string | null
  matched: { tableId: string; seat: number }[]
  onSelect: (id: string | null) => void
  idPrefix?: string
}

function tableAtPoint(svg: SVGSVGElement, event: PointerEvent<SVGSVGElement>) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  const pt = svg.createSVGPoint()
  pt.x = event.clientX
  pt.y = event.clientY
  const loc = pt.matrixTransform(ctm.inverse())
  for (const table of TABLES) {
    const dx = loc.x - table.x
    const dy = loc.y - table.y
    if (dx * dx + dy * dy <= HIT_RADIUS * HIT_RADIUS) return table.id
  }
  return null
}

export function FloorPlan({ guests, selectedId, matched, onSelect }: FloorPlanProps) {
  const matchByTable = new Map<string, number[]>()
  for (const hit of matched) {
    const list = matchByTable.get(hit.tableId) ?? []
    list.push(hit.seat)
    matchByTable.set(hit.tableId, list)
  }

  return (
    <svg
      viewBox={`0 0 ${LAYOUT.width} ${LAYOUT.height}`}
      className="h-auto w-full bg-white"
      aria-label="江林府喜宴 The Grand Ballroom I 場地桌次圖"
      style={{ touchAction: "manipulation" }}
      onPointerDown={(event) => {
        const id = tableAtPoint(event.currentTarget, event)
        if (id) {
          event.preventDefault()
          onSelect(id)
        }
      }}
    >
      <image
        href={LAYOUT.image}
        x="0"
        y="0"
        width={LAYOUT.width}
        height={LAYOUT.height}
        preserveAspectRatio="xMidYMid meet"
      />

      {TABLES.map((table: TableDef) => (
        <RoundTable
          key={table.id}
          table={table}
          guests={guests[table.id] ?? []}
          selected={selectedId === table.id}
          matchedSeats={matchByTable.get(table.id)}
          radius={table.id === "head" ? 16 : 13}
          chairRadius={table.id === "head" ? 28 : 23}
          onSelect={(id) => onSelect(id)}
        />
      ))}
    </svg>
  )
}
