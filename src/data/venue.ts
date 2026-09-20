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
  /** 本桌空位移出、供超額桌加椅用的餐具份數。 */
  spareCovers?: number
  /** 超額桌的移餐來源桌號。 */
  coverFrom?: string
  /** 移餐額度要送到的超額桌號。 */
  coverTo?: string
  /** 另備兒童座椅（不佔主位）。 */
  childSeats?: string[]
}

export const LAYOUT = {
  width: 588,
  height: 808,
  image: "/venue/ballroom-i.jpg",
}

/**
 * 桌心座標從場地示意圖 PNG 追蹤（588×808）。
 * 左 10 桌（12–21）右 10 桌（1–3、5–11），無 4、22 號。
 */
export const TABLES: TableDef[] = [
  {
    id: "head",
    label: "主桌",
    title: "新郎新娘長輩桌",
    seats: 12,
    diet: "2 人不吃牛",
    x: 267.5,
    y: 238.3,
    side: "center",
    zone: "舞台前方 · 走道花廊",
  },
  { id: "1", label: "1", title: "女方艾克森桌（超額 12 席）", seats: 12, diet: "全部葷食 · 圓桌 10 位超額 2，餐具由 5 桌空位調配", x: 314.2, y: 309.4, side: "stage-right", zone: "面向舞台右側 · 走道旁", coverFrom: "5" },
  { id: "2", label: "2", title: "女方艾克森桌", seats: 10, diet: "1 人素食", x: 314.1, y: 379.1, side: "stage-right", zone: "面向舞台右側 · 走道旁" },
  { id: "3", label: "3", title: "女方創順與好友桌（超額 11 席）", seats: 11, diet: "全部葷食 · 圓桌 10 位超額 1，餐具由 7 桌空位調配 · 另備兒童座椅 1（吳孟錡，不佔主位）", x: 314.1, y: 452.4, side: "stage-right", zone: "面向舞台右側 · 走道旁", coverFrom: "7", childSeats: ["吳孟錡"] },
  { id: "6", label: "6", title: "女方媽媽親戚桌（移餐額度 1）", seats: 10, diet: "全部葷食 · 空 1 席移給 17 桌", x: 369.7, y: 269.7, side: "stage-right", zone: "面向舞台右側 · 中排", spareCovers: 1, coverTo: "17" },
  { id: "7", label: "7", title: "女方爸爸親戚桌（移餐額度 1）", seats: 10, diet: "全部葷食 · 空 1 席移給 3 桌", x: 369.8, y: 334.9, side: "stage-right", zone: "面向舞台右側 · 中排", spareCovers: 1, coverTo: "3" },
  { id: "8", label: "8", title: "女方仁寶桌", seats: 10, diet: "1 人不吃牛", x: 369.8, y: 404.8, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "5", label: "5", title: "女方爸爸親戚桌（移餐額度 2）", seats: 10, diet: "全部葷食 · 空 2 席移給 1 桌，另 1 席保留", x: 426.3, y: 298.5, side: "stage-right", zone: "面向舞台右側 · 靠牆", spareCovers: 2, coverTo: "1" },
  { id: "9", label: "9", title: "女方爸爸親戚桌（移餐額度 1）", seats: 10, diet: "全部葷食 · 空 1 席移給 13 桌，另 1 席保留", x: 426.4, y: 368.3, side: "stage-right", zone: "面向舞台右側 · 靠牆", spareCovers: 1, coverTo: "13" },
  { id: "10", label: "10", title: "女方（預備桌）", seats: 10, diet: "整桌預備 · 不列入移餐額度", x: 426.4, y: 441.7, side: "stage-right", zone: "面向舞台右側 · 靠牆" },
  { id: "11", label: "11", title: "女方萬里雲桌", seats: 10, diet: "全部葷食", x: 369.7, y: 471.7, side: "stage-right", zone: "面向舞台右側 · 中排" },
  { id: "12", label: "12", title: "金門魏爺爺親友桌", seats: 10, diet: "全部葷食", x: 214.6, y: 308.7, side: "stage-left", zone: "面向舞台左側 · 走道旁（近主桌）" },
  { id: "13", label: "13", title: "新郎江紀武好友桌（超額 11 席）", seats: 11, diet: "全部葷食 · 圓桌 10 位超額 1，餐具由 9 桌空位調配 · 另備兒童座椅 1（Lory，不佔主位）", x: 214.7, y: 378.5, side: "stage-left", zone: "面向舞台左側 · 走道旁", coverFrom: "9", childSeats: ["Lory"] },
  { id: "14", label: "14", title: "新郎江紀武好友桌", seats: 10, diet: "全部葷食 · 另備兒童座椅 1（廖宇軒，不佔主位）", x: 214.6, y: 451.8, side: "stage-left", zone: "面向舞台左側 · 走道旁", childSeats: ["廖宇軒"] },
  { id: "15", label: "15", title: "江家長輩親友桌", seats: 10, diet: "2 人不吃牛", x: 158.1, y: 275.7, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "16", label: "16", title: "爸爸同學友人桌", seats: 10, diet: "全部葷食", x: 158.1, y: 346.9, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "17", label: "17", title: "爸爸同學友人桌（超額 11 席）", seats: 11, diet: "1 人素食 · 圓桌 10 位超額 1，餐具由 6 桌空位調配", x: 158.2, y: 414.3, side: "stage-left", zone: "面向舞台左側 · 中排", coverFrom: "6" },
  { id: "19", label: "19", title: "爸爸同學友人桌", seats: 10, diet: "全部葷食", x: 158.1, y: 476.4, side: "stage-left", zone: "面向舞台左側 · 中排" },
  { id: "18", label: "18", title: "楊家親友桌", seats: 10, diet: "5 人不吃牛", x: 104.4, y: 299.3, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "20", label: "20", title: "楊家親友桌", seats: 10, diet: "1 人不吃牛", x: 104.4, y: 374.3, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
  { id: "21", label: "21", title: "楊家親友桌", seats: 10, diet: "全部葷食", x: 104.4, y: 443.8, side: "stage-left", zone: "面向舞台左側 · 靠牆" },
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

export function childSeatNote(table: TableDef) {
  if (!table.childSeats?.length) return ""
  return `另備兒童座椅 ${table.childSeats.length}（${table.childSeats.join("、")}，不佔主位）`
}

export function allChildSeatNotes() {
  return TABLES.filter((table) => table.childSeats?.length).map((table) => {
    const label = table.id === "head" ? "主桌" : `${table.label} 桌`
    return `${label}${childSeatNote(table)}`
  })
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

/** 超額加椅數（主桌固定 12 席不算加椅）。 */
export function extraChairCount(table: TableDef) {
  if (table.id === "head") return 0
  return Math.max(0, table.seats - DEFAULT_SEAT_COUNT)
}

/** 本桌空位中，最後 N 席作為移餐額度。回傳 1-based 座號。 */
export function spareCoverSeats(guests: string[], spareCovers = 0) {
  if (!spareCovers) return [] as number[]
  const empties: number[] = []
  guests.forEach((name, index) => {
    if (!name) empties.push(index + 1)
  })
  return empties.slice(-spareCovers)
}

export function isSpareCoverSeat(table: TableDef, guests: string[], seat: number) {
  return spareCoverSeats(guests, table.spareCovers ?? 0).includes(seat)
}

export function shortName(name: string) {
  if (!name) return ""
  const trimmed = name
    .replace(/·不吃牛/g, "")
    .replace(/·素食/g, "")
    .replace(/（/g, "(")
    .split("(")[0]
    .trim()
  return trimmed.slice(0, 5)
}
