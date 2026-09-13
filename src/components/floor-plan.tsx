"use client"

import type { PointerEvent } from "react"

import { LAYOUT, TABLES, type TableDef } from "@/data/venue"
import { RoundTable } from "@/components/round-table"
import type { GuestMap } from "@/lib/seating"

const HIT_RADIUS = 54

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

export function FloorPlan({ guests, selectedId, matched, onSelect, idPrefix = "live" }: FloorPlanProps) {
  const matchByTable = new Map<string, number[]>()
  for (const hit of matched) {
    const list = matchByTable.get(hit.tableId) ?? []
    list.push(hit.seat)
    matchByTable.set(hit.tableId, list)
  }

  return (
    <svg
      viewBox={`0 0 ${LAYOUT.width} ${LAYOUT.height}`}
      className="h-auto w-full bg-[#f6efe4]"
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
      <defs>
        <pattern id={`${idPrefix}-carpet`} width="28" height="28" patternUnits="userSpaceOnUse">
          <rect width="28" height="28" fill="#f3e6d4" />
          <circle cx="14" cy="14" r="1.1" fill="#e7d3b5" />
        </pattern>
        <linearGradient id={`${idPrefix}-stageGold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d58b" />
          <stop offset="100%" stopColor="#c4922a" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-aisle`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e39b1a" />
          <stop offset="100%" stopColor="#c47a12" />
        </linearGradient>
      </defs>

      <rect width={LAYOUT.width} height={LAYOUT.height} fill="#f6efe4" />

      <text
        x={LAYOUT.width / 2}
        y={22}
        textAnchor="middle"
        fontSize="15"
        fill="#7c2d12"
        fontWeight="700"
      >
        1004 江林府喜宴 · The Grand Ballroom I
      </text>
      <text x={LAYOUT.width / 2} y={38} textAnchor="middle" fontSize="9" fill="#92400e">
        寬 21.63 m　深 24.80 m　圓桌 22 桌（主桌 + 1–3、5–22）每桌 10 席
      </text>

      <rect
        x={LAYOUT.room.x}
        y={LAYOUT.room.y}
        width={LAYOUT.room.w}
        height={LAYOUT.room.h}
        fill={`url(#${idPrefix}-carpet)`}
        stroke="#7c2d12"
        strokeWidth="3"
        rx="6"
      />

      <path
        d="M250 36 q20 28 0 42"
        fill="none"
        stroke="#7c2d12"
        strokeWidth="3"
      />
      <path
        d="M850 36 q-20 28 0 42"
        fill="none"
        stroke="#7c2d12"
        strokeWidth="3"
      />

      <rect
        x={LAYOUT.stage.x}
        y={LAYOUT.stage.y}
        width={LAYOUT.stage.w}
        height={LAYOUT.stage.h}
        fill={`url(#${idPrefix}-stageGold)`}
        stroke="#92400e"
        strokeWidth="2"
      />
      <text
        x={550}
        y={88}
        textAnchor="middle"
        fontSize="11"
        fill="#7c2d12"
        fontWeight="700"
      >
        舞台音響 / 地板磁磚
      </text>
      <rect x={430} y={108} width={240} height="78" fill="#f8ead0" stroke="#a16207" />
      <line x1="510" y1="108" x2="510" y2="186" stroke="#a16207" />
      <line x1="590" y1="108" x2="590" y2="186" stroke="#a16207" />
      <text x="550" y="152" textAnchor="middle" fontSize="10" fill="#7c2d12">
        Stage 732 × 366 × 60cm
      </text>
      <rect x="338" y="168" width="28" height="44" fill="#d6d3d1" stroke="#57534e" />
      <rect x="734" y="168" width="28" height="44" fill="#d6d3d1" stroke="#57534e" />
      <rect x="300" y="118" width="48" height="22" fill="#e7e5e4" stroke="#57534e" />
      <text x="324" y="133" textAnchor="middle" fontSize="8" fill="#44403c">
        AV
      </text>
      <rect x="392" y="196" width="46" height="18" fill="#fef3c7" stroke="#a16207" />
      <text x="415" y="209" textAnchor="middle" fontSize="8" fill="#7c2d12">
        禮桌
      </text>

      <rect
        x={LAYOUT.aisle.x}
        y={LAYOUT.aisle.y}
        width={LAYOUT.aisle.w}
        height={LAYOUT.aisle.h}
        fill={`url(#${idPrefix}-aisle)`}
      />
      <text
        x="550"
        y="560"
        textAnchor="middle"
        fontSize="12"
        fill="#fff7ed"
        fontWeight="700"
        transform="rotate(-90 550 560)"
        style={{ pointerEvents: "none" }}
      >
        走道花廊
      </text>
      <text x="550" y="980" textAnchor="middle" fontSize="9" fill="#fff7ed" style={{ pointerEvents: "none" }}>
        寬 80 · 深 100
      </text>

      {["#fb7185", "#fbbf24", "#fb7185", "#fbbf24", "#fb7185"].map((color, i) => (
        <g key={i} style={{ pointerEvents: "none" }}>
          <circle cx={528} cy={300 + i * 140} r="6" fill={color} opacity="0.9" />
          <circle cx={572} cy={360 + i * 140} r="6" fill={color === "#fb7185" ? "#fbbf24" : "#fb7185"} />
        </g>
      ))}

      <text x="88" y="280" fontSize="9" fill="#7c2d12" transform="rotate(-90 88 280)" style={{ pointerEvents: "none" }}>
        210″ screen
      </text>
      <text x="88" y="620" fontSize="9" fill="#7c2d12" transform="rotate(-90 88 620)">
        210″ screen
      </text>
      <line x1="78" y1="240" x2="78" y2="330" stroke="#a8a29e" strokeWidth="4" />
      <line x1="78" y1="560" x2="78" y2="650" stroke="#a8a29e" strokeWidth="4" />

      <path
        d="M515 1160 q18 -44 35 0 q18 44 35 0"
        fill="none"
        stroke="#fb7185"
        strokeWidth="3"
      />
      <text x="550" y="1192" textAnchor="middle" fontSize="8" fill="#9f1239" style={{ pointerEvents: "none" }}>
        拱門 寬 300 · 高 300 · 深 150cm
      </text>

      {TABLES.map((table: TableDef) => (
        <RoundTable
          key={table.id}
          table={table}
          guests={guests[table.id]}
          selected={selectedId === table.id}
          matchedSeats={matchByTable.get(table.id)}
          onSelect={(id) => onSelect(id)}
        />
      ))}

      <rect x="70" y="1246" width="168" height="86" fill="#fafaf9" stroke="#7c2d12" />
      <text x="154" y="1296" textAnchor="middle" fontSize="12" fill="#7c2d12" fontWeight="700">
        VIP Room
      </text>

      <path d="M430 1246 v40" stroke="#7c2d12" strokeWidth="3" />
      <path d="M670 1246 v40" stroke="#7c2d12" strokeWidth="3" />
      <path
        d="M470 1288 c0 28 20 48 80 48 s80 -20 80 -48"
        fill="#f6efe4"
        stroke="#7c2d12"
        strokeWidth="3"
      />
      <polygon points="550,1328 538,1362 562,1362" fill="#e11d48" />
      <rect x="538" y="1360" width="24" height="46" fill="#e11d48" />

      <rect x="620" y="1395" width="118" height="28" fill="#fff" stroke="#57534e" />
      <text x="679" y="1413" textAnchor="middle" fontSize="9" fill="#44403c">
        收禮桌
      </text>
      <rect x="760" y="1402" width="70" height="22" fill="#fff" stroke="#57534e" />
      <text x="795" y="1417" textAnchor="middle" fontSize="9" fill="#44403c">
        相本桌
      </text>
      <rect x="860" y="1388" width="22" height="70" fill="#fff" stroke="#57534e" />
      <text
        x="871"
        y="1424"
        textAnchor="middle"
        fontSize="8"
        fill="#44403c"
        transform="rotate(90 871 1424)"
      >
        迎賓飲料
      </text>

      <rect x="300" y="1460" width="26" height="150" fill="#fff" stroke="#57534e" />
      <text
        x="313"
        y="1536"
        textAnchor="middle"
        fontSize="9"
        fill="#44403c"
        transform="rotate(-90 313 1536)"
      >
        迎賓拍照區 寬 500 · 高 270cm
      </text>

      <text x="550" y="1618" textAnchor="middle" fontSize="13" fill="#7c2d12" fontWeight="800">
        入口
      </text>
    </svg>
  )
}
