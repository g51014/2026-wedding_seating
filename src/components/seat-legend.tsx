"use client"

import { DEFAULT_SEAT_COUNT, seatPoint } from "@/data/venue"

export function SeatLegend() {
  const cx = 70
  const cy = 70
  return (
    <div className="rounded-xl border border-amber-200 bg-[#fffaf3] p-3">
      <p className="mb-2 text-sm font-medium text-[#7c2d12]">座位方向</p>
      <svg viewBox="0 0 140 150" className="mx-auto h-36 w-36">
        <text x="70" y="12" textAnchor="middle" fontSize="8" fill="#92400e">
          舞台方向
        </text>
        <polygon points="70,16 64,26 76,26" fill="#b45309" />
        {Array.from({ length: DEFAULT_SEAT_COUNT }, (_, i) => {
          const seat = i + 1
          const p = seatPoint(cx, cy + 8, 42, seat)
          return (
            <g key={seat}>
              <circle
                cx={p.x}
                cy={p.y}
                r={seat === 1 ? 8 : 7}
                fill={seat === 1 ? "#e11d48" : "#fff7ed"}
                stroke="#9f1239"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={p.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="7"
                fill={seat === 1 ? "#fff" : "#7c2d12"}
                fontWeight="700"
              >
                {seat}
              </text>
            </g>
          )
        })}
        <circle cx={cx} cy={cy + 8} r="18" fill="#fffbeb" stroke="#b45309" />
        <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#7c2d12">
          圓桌
        </text>
      </svg>
      <p className="text-xs leading-relaxed text-[#92400e]">
        紅點為 1 號位；其餘順時針。主桌 12 席，其餘圓桌 10 席。綠點為素食，粉點為不吃牛。
      </p>
    </div>
  )
}
