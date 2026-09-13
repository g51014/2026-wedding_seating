export const DEFAULT_SEAT_COUNT = 10

/**
 * 1 號位：依場地圖二紅點，近舞台左上（約 10:48）。
 * 之後順時針編號。
 */
export const SEAT1_DEG = -126

export type TableSide = "center" | "stage-left" | "stage-right"

export type TableDef = {
  id: string
  label: string
  title: string
  seats: number
  diet: string
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
  {
    id: "head",
    label: "主桌",
    title: "新郎新娘長輩桌",
    seats: 12,
    diet: "全部葷食",
    x: 550,
    y: 248,
    side: "center",
    zone: "舞台前方 · 走道花廊",
  },
  { id: "1", label: "1", title: "女方（未排）", seats: 10, diet: "", x: 638, y: 368, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "2", label: "2", title: "女方（未排）", seats: 10, diet: "", x: 638, y: 512, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "3", label: "3", title: "女方（未排）", seats: 10, diet: "", x: 638, y: 656, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "6", label: "6", title: "女方（未排）", seats: 10, diet: "", x: 778, y: 400, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "7", label: "7", title: "女方（未排）", seats: 10, diet: "", x: 778, y: 544, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "8", label: "8", title: "女方（未排）", seats: 10, diet: "", x: 778, y: 688, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "5", label: "5", title: "女方（未排）", seats: 10, diet: "", x: 918, y: 318, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "9", label: "9", title: "女方（未排）", seats: 10, diet: "", x: 918, y: 462, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "10", label: "10", title: "女方（未排）", seats: 10, diet: "", x: 918, y: 606, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "11", label: "11", title: "女方（未排）", seats: 10, diet: "", x: 918, y: 750, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "12", label: "12", title: "金門魏爺爺親友桌", seats: 10, diet: "全部葷食", x: 462, y: 368, side: "stage-left", zone: "面向舞台左側 · 走道旁（近主桌）" },
  { id: "13", label: "13", title: "新郎江紀武好友桌", seats: 10, diet: "全部葷食", x: 462, y: 512, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "14", label: "14", title: "新郎江紀武好友桌", seats: 10, diet: "全部葷食", x: 462, y: 656, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "15", label: "15", title: "江家長輩親友桌", seats: 10, diet: "全部葷食", x: 322, y: 332, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "16", label: "16", title: "楊家長輩親友桌", seats: 10, diet: "全部葷食", x: 322, y: 476, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "17", label: "17", title: "楊家長輩親友桌", seats: 10, diet: "全部葷食", x: 322, y: 620, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "19", label: "19", title: "楊家長輩親友桌", seats: 10, diet: "全部葷食", x: 322, y: 764, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "18", label: "18", title: "江爸爸好友桌", seats: 10, diet: "全部葷食", x: 182, y: 332, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "20", label: "20", title: "江爸爸好友桌", seats: 10, diet: "1 人素食", x: 182, y: 476, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "21", label: "21", title: "江爸爸好友桌", seats: 10, diet: "全部葷食", x: 182, y: 620, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "22", label: "22", title: "男方（備用）", seats: 10, diet: "", x: 182, y: 768, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
]

/** 名單順序：主桌 → 男方（左）→ 女方（右） */
export const TABLE_ORDER = [
  "head",
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
] as const

export function tableById(id: string) {
  return TABLES.find((table) => table.id === id)
}

export function seatCount(table: TableDef) {
  return table.seats
}

export function totalSeats() {
  return TABLES.reduce((sum, table) => sum + table.seats, 0)
}

export function seatAngleDeg(seat: number, seats = DEFAULT_SEAT_COUNT) {
  return SEAT1_DEG + (seat - 1) * (360 / seats)
}

export function seatPoint(
  cx: number,
  cy: number,
  radius: number,
  seat: number,
  seats = DEFAULT_SEAT_COUNT
) {
  const rad = (seatAngleDeg(seat, seats) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

export function emptyGuests(): Record<string, string[]> {
  return Object.fromEntries(
    TABLES.map((table) => [table.id, Array.from({ length: table.seats }, () => "")])
  )
}

export function shortName(name: string) {
  if (!name) return ""
  const trimmed = name.replace(/（/g, "(").split("(")[0].trim()
  return trimmed.slice(0, 5)
}
