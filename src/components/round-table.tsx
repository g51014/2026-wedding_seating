"use client"

import type { MouseEvent, PointerEvent } from "react"

import { seatPoint, shortName, type TableDef } from "@/data/venue"

type RoundTableProps = {
  table: TableDef
  radius?: number
  chairRadius?: number
  guests: string[]
  selected?: boolean
  matchedSeats?: number[]
  showNames?: boolean
  nameSize?: number
  onSelect?: (id: string) => void
  onSeatClick?: (seat: number) => void
}

export function RoundTable({
  table,
  radius = 28,
  chairRadius = 42,
  guests,
  selected,
  matchedSeats = [],
  showNames = false,
  nameSize = 7,
  onSelect,
  onSeatClick,
}: RoundTableProps) {
  const isHead = table.id === "head"
  const seats = table.seats
  const tableRadius = isHead ? radius + 4 : radius
  const chairs = isHead ? chairRadius + 6 : chairRadius

  function selectTable(event: MouseEvent | PointerEvent) {
    event.stopPropagation()
    onSelect?.(table.id)
  }

  return (
    <g
      className="cursor-pointer"
      onPointerDown={selectTable}
      onClick={selectTable}
      style={{ pointerEvents: "all" }}
    >
      <circle
        cx={table.x}
        cy={table.y}
        r={chairs + 10}
        fill="rgba(255,247,237,0.01)"
      />
      {Array.from({ length: seats }, (_, i) => {
        const seat = i + 1
        const p = seatPoint(table.x, table.y, chairs, seat, seats)
        const matched = matchedSeats.includes(seat)
        const filled = Boolean(guests[i])
        const veg = (guests[i] ?? "").includes("素食")
        const label = showNames ? shortName(guests[i]) || `${seat}` : seat === 1 ? "1" : ""
        const labelPos = showNames
          ? seatPoint(table.x, table.y, chairs + 14, seat, seats)
          : p
        return (
          <g
            key={seat}
            onClick={(event) => {
              event.stopPropagation()
              onSelect?.(table.id)
              onSeatClick?.(seat)
            }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={seat === 1 ? 7.2 : 6.1}
              fill={
                seat === 1
                  ? "#e11d48"
                  : veg
                    ? "#15803d"
                    : matched
                      ? "#d97706"
                      : filled
                        ? "#7c2d12"
                        : "#fff7ed"
              }
              stroke={seat === 1 ? "#9f1239" : selected ? "#b45309" : "#b45309"}
              strokeWidth={seat === 1 ? 1.6 : 1}
            />
            {label ? (
              <text
                x={labelPos.x}
                y={labelPos.y + (showNames ? 0 : 0.6)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={showNames ? nameSize : 6.5}
                fill={
                  showNames
                    ? seat === 1
                      ? "#9f1239"
                      : "#3f2a1d"
                    : "#fff7ed"
                }
                fontWeight={seat === 1 ? 700 : 500}
              >
                {label}
              </text>
            ) : null}
          </g>
        )
      })}
      <circle
        cx={table.x}
        cy={table.y}
        r={tableRadius}
        fill={isHead ? "#7f1d1d" : selected ? "#fde68a" : "#fffbeb"}
        stroke={selected ? "#b45309" : isHead ? "#fecaca" : "#b45309"}
        strokeWidth={selected ? 3 : 1.6}
      />
      <text
        x={table.x}
        y={table.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={isHead ? 11 : 13}
        fill={isHead ? "#fef3c7" : "#7c2d12"}
        fontWeight={700}
      >
        {table.label}
      </text>
    </g>
  )
}
