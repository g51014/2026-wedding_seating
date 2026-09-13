export const SEAT_COUNT = 10

/**
 * 1 號位：依場地圖二（Grand Ballroom II）紅點，
 * 位於每桌靠近舞台的左上椅（約 10:48 方向）。
 * 之後順時針 2–10。
 * 角度以 3 點鐘為 0°、順時針為正（螢幕座標 y 向下）。
 */
export const SEAT1_DEG = -126

export type TableSide = "center" | "stage-left" | "stage-right"

export type TableDef = {
  id: string
  label: string
  x: number
  y: number
  side: TableSide
  zone: string
}

export const LAYOUT = {
  width: 1100,
  height: 1640,
  room: { x: 70, y: 36, w: 960, h: 1210 },
  stage: { x: 365, y: 62, w: 370, h: 158 },
  aisle: { x: 515, y: 220, w: 70, h: 940 },
}

export const TABLES: TableDef[] = [
  { id: "head", label: "主桌", x: 550, y: 248, side: "center", zone: "舞台前方 · 走道花廊" },

  { id: "1", label: "1", x: 638, y: 368, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "2", label: "2", x: 638, y: 512, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "3", label: "3", x: 638, y: 656, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "6", label: "6", x: 778, y: 400, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "7", label: "7", x: 778, y: 544, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "8", label: "8", x: 778, y: 688, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "5", label: "5", x: 918, y: 318, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "9", label: "9", x: 918, y: 462, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "10", label: "10", x: 918, y: 606, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "11", label: "11", x: 918, y: 750, side: "stage-right", zone: "面向舞台右側 · 靠牆" },

  { id: "12", label: "12", x: 462, y: 368, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "13", label: "13", x: 462, y: 512, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "14", label: "14", x: 462, y: 656, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "15", label: "15", x: 322, y: 332, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "16", label: "16", x: 322, y: 476, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "17", label: "17", x: 322, y: 620, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "19", label: "19", x: 322, y: 764, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "18", label: "18", x: 182, y: 332, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "20", label: "20", x: 182, y: 476, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "21", label: "21", x: 182, y: 620, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "22", label: "22", x: 182, y: 768, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
]

export const TABLE_ORDER = [
  "head",
  "1",
  "2",
  "3",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
] as const

export function seatAngleDeg(seat: number) {
  return SEAT1_DEG + (seat - 1) * (360 / SEAT_COUNT)
}

export function seatPoint(cx: number, cy: number, radius: number, seat: number) {
  const rad = (seatAngleDeg(seat) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

export function emptyGuests(): Record<string, string[]> {
  return Object.fromEntries(
    TABLES.map((table) => [table.id, Array.from({ length: SEAT_COUNT }, () => "")])
  )
}

export function tableById(id: string) {
  return TABLES.find((table) => table.id === id)
}
