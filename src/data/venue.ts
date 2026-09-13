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

/**
 * Grand Ballroom I 桌位（面對入口、舞台在上）：
 * 左側 11 桌 12–22，右側 10 桌 1–3、5–11（場地無 4 號）。
 * 蜂巢排列：靠牆／中排較近舞台，走道旁桌落在兩排之間。
 *
 *   18  15           6   5
 *         12      1
 *   20  16         7   9
 *         13      2
 *   21  17         8  10
 *         14      3
 *   22  19            11
 */
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
  { id: "1", label: "1", title: "女方（未排）", seats: 10, diet: "", x: 645, y: 450, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "2", label: "2", title: "女方（未排）", seats: 10, diet: "", x: 645, y: 650, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "3", label: "3", title: "女方（未排）", seats: 10, diet: "", x: 645, y: 850, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "6", label: "6", title: "女方（未排）", seats: 10, diet: "", x: 775, y: 350, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "7", label: "7", title: "女方（未排）", seats: 10, diet: "", x: 775, y: 550, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "8", label: "8", title: "女方（未排）", seats: 10, diet: "", x: 775, y: 750, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "5", label: "5", title: "女方（未排）", seats: 10, diet: "", x: 920, y: 350, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "9", label: "9", title: "女方（未排）", seats: 10, diet: "", x: 920, y: 550, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "10", label: "10", title: "女方（未排）", seats: 10, diet: "", x: 920, y: 750, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "11", label: "11", title: "女方（未排）", seats: 10, diet: "", x: 920, y: 950, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "12", label: "12", title: "金門魏爺爺親友桌", seats: 10, diet: "全部葷食", x: 455, y: 450, side: "stage-left", zone: "面向舞台左側 · 走道旁（近主桌）" },
  { id: "13", label: "13", title: "新郎部屬桌（A／C／QA）", seats: 10, diet: "全部葷食", x: 455, y: 650, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "14", label: "14", title: "新郎部屬桌（B Team）", seats: 10, diet: "全部葷食 · 另備兒童座椅 1（廖宇軒小朋友，不佔主位）", x: 455, y: 850, side: "stage-left", zone: "面向舞台左側 · 走道旁" },
  { id: "15", label: "15", title: "江家長輩親友桌", seats: 10, diet: "全部葷食", x: 325, y: 350, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "16", label: "16", title: "楊家長輩親友桌", seats: 10, diet: "全部葷食", x: 325, y: 550, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "17", label: "17", title: "楊家長輩親友桌", seats: 10, diet: "全部葷食", x: 325, y: 750, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "19", label: "19", title: "楊家長輩親友桌", seats: 10, diet: "全部葷食", x: 325, y: 950, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "18", label: "18", title: "江爸爸好友桌", seats: 10, diet: "全部葷食", x: 180, y: 350, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "20", label: "20", title: "江爸爸好友桌", seats: 10, diet: "1 人素食", x: 180, y: 550, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "21", label: "21", title: "江爸爸好友桌", seats: 10, diet: "全部葷食", x: 180, y: 750, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "22", label: "22", title: "男方（備用）", seats: 10, diet: "", x: 180, y: 950, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
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
