"use client"

import { SEAT_COUNT, seatPoint, type TableDef } from "@/data/venue"

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
  return (
    <g
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.(table.id)
      }}
    >
      {Array.from({ length: SEAT_COUNT }, (_, i) => {
        const seat = i + 1
        const p = seatPoint(table.x, table.y, chairRadius, seat)
        const matched = matchedSeats.includes(seat)
        const filled = Boolean(guests[i])
        return (
          <g key={seat} onClick={() => onSeatClick?.(seat)}>
            <circle
              cx={p.x}
              cy={p.y}
              r={seat === 1 ? 7.2 : 6.1}
              fill={seat === 1 ? "#e11d48" : matched ? "#d97706" : filled ? "#7c2d12" : "#fff7ed"}
              stroke={seat === 1 ? "#9f1239" : selected ? "#b45309" : "#b45309"}
              strokeWidth={seat === 1 ? 1.6 : 1}
            />
            {showNames ? (
              <text
                x={seatPoint(table.x, table.y, chairRadius + 14, seat).x}
                y={seatPoint(table.x, table.y, chairRadius + 14, seat).y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={nameSize}
                fill={seat === 1 ? "#9f1239" : "#3f2a1d"}
                fontWeight={seat === 1 ? 700 : 500}
              >
                {guests[i] || `${seat}`}
              </text>
            ) : seat === 1 ? (
              <text
                x={p.x}
                y={p.y + 0.6}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={6.5}
                fill="#fff7ed"
                fontWeight={700}
              >
                1
              </text>
            ) : null}
          </g>
        )
      })}
      <circle
        cx={table.x}
        cy={table.y}
        r={radius}
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
