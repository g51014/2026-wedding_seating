import { displayGuestName, isNoBeef, isVegetarian } from "@/data/guests"
import { TABLE_ORDER, TABLES, tableById } from "@/data/venue"
import type { GuestMap } from "@/lib/seating"

export type ServiceStyle = "lazy-susan" | "plated"

export type DietKind = "vegetarian" | "no-beef"

export type MenuDish = {
  id: string
  nameZh: string
  nameEn: string
  service: ServiceStyle
  serviceNote?: string
  vegetarianSafe?: boolean
  containsBeef?: boolean
  containsPork?: boolean
  origin?: string
}

export type MenuSection = {
  id: string
  titleZh: string
  titleEn?: string
  note?: string
  dishes: MenuDish[]
}

export type DietGuest = {
  seat: number
  name: string
  displayName: string
  kind: DietKind
}

export const MENU = {
  hotel: "文華東方酒店",
  titleZh: "中式婚宴菜單",
  titleEn: "Chinese Wedding Menu",
  intro:
    "「迎賓風味小碟」和「文華東方拼盤」會放在桌面玻璃轉台上供賓客自行取用。",
  priceTwd: 35800,
  guestsPerTable: 10,
  taxNote: "以上價格為含稅價格，外加 10% 服務費。",
  image: "/menu/wedding-menu.png",
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "appetizer",
    titleZh: "迎賓風味小碟",
    titleEn: "Mandarin Oriental Appetizer",
    note: "轉台自取",
    dishes: [
      {
        id: "truffle-mushroom",
        nameZh: "松露白果蔦蘑菇",
        nameEn: "Truffle, Ginkgo, Wild Mushroom, Marinated",
        service: "lazy-susan",
        vegetarianSafe: true,
      },
      {
        id: "candied-walnut",
        nameZh: "琥珀糖漬芝麻核桃",
        nameEn: "Walnut, Sesame Seeds, Candied",
        service: "lazy-susan",
        vegetarianSafe: true,
      },
      {
        id: "bean-curd-roll",
        nameZh: "椒麻雲耳素雞捲",
        nameEn: "Bean Curd Roll, Fungus, Chili Sauce, Braised",
        service: "lazy-susan",
        vegetarianSafe: true,
      },
    ],
  },
  {
    id: "platter",
    titleZh: "文華東方拼盤",
    titleEn: "Mandarin Oriental Combination Platter",
    note: "轉台自取",
    dishes: [
      {
        id: "beef-shank",
        nameZh: "青花椒滷美國牛腱",
        nameEn: "U.S. Beef Shank, Sichuan Green Peppercorns",
        service: "lazy-susan",
        containsBeef: true,
        origin: "牛肉原產地：美國",
      },
      {
        id: "yilan-duck",
        nameZh: "果木燒烤桃鴨",
        nameEn: "Traditional Yilan Duck, Roasted",
        service: "lazy-susan",
      },
      {
        id: "soya-chicken",
        nameZh: "瓦罐玫瑰豉油雞",
        nameEn: "Free Range Chicken, Soya Sauce, Braised",
        service: "lazy-susan",
      },
    ],
  },
  {
    id: "soup",
    titleZh: "湯與點心",
    dishes: [
      {
        id: "abalone-soup",
        nameZh: "羊肚菌鮑魚山藥瑤柱燉雞湯",
        nameEn: "Abalone, Conpoy, Yam, Morel Mushroom, Chicken Consommé, Double-Boiled",
        service: "plated",
        serviceNote: "位上／一人一碗",
      },
      {
        id: "flower-dumpling",
        nameZh: "花好月又圓",
        nameEn: "Glutinous Rice Dumpling, Peanut Powder, Deep-Fried",
        service: "lazy-susan",
        serviceNote: "放轉台上供賓客自行取用",
        vegetarianSafe: true,
      },
    ],
  },
  {
    id: "seafood",
    titleZh: "熱菜",
    dishes: [
      {
        id: "grouper",
        nameZh: "金蒜醬蒸海岩龍躉",
        nameEn: "Green Grouper, Garlic Sauce, Steamed",
        service: "plated",
        serviceNote: "位上／每位半隻",
      },
      {
        id: "lobster",
        nameZh: "花菇蟲草蒸點帶石斑",
        nameEn: "Rock Lobster, Flower Mushroom, Cordyceps, Steamed",
        service: "plated",
        serviceNote: "位上",
      },
      {
        id: "veal-rack",
        nameZh: "燒烤紐西蘭小牛肋排佐黑胡椒醬",
        nameEn: "New Zealand Veal Rack, Black Pepper Sauce, Grilled",
        service: "plated",
        serviceNote: "位上",
        containsBeef: true,
        origin: "牛肉原產地：紐西蘭",
      },
      {
        id: "glutinous-rice",
        nameZh: "蟹肉櫻花蝦台式糯米飯",
        nameEn: "Crab Meat, Sakura Shrimp, Mushrooms, Glutinous Rice, Steamed",
        service: "plated",
        serviceNote: "位上",
        containsPork: true,
        origin: "豬肉原產地：台灣",
      },
    ],
  },
  {
    id: "dessert",
    titleZh: "甜點",
    dishes: [
      {
        id: "vanilla-creme",
        nameZh: "香草奶霜、覆盆子醬、開心果＆檸檬沙布蕾餅乾",
        nameEn: "Vanilla Crème, Raspberry Confit, Pistachio & Lemon Sable",
        service: "plated",
        serviceNote: "位上",
        vegetarianSafe: true,
      },
      {
        id: "petits-fours",
        nameZh: "精緻小點",
        nameEn: "Petits Fours",
        service: "lazy-susan",
        serviceNote: "放轉台上供賓客自行取用",
        vegetarianSafe: true,
      },
    ],
  },
]

export const LAZY_SUSAN_BEEF = MENU_SECTIONS.flatMap((section) => section.dishes).find(
  (dish) => dish.id === "beef-shank"
)!

export const PLATED_BEEF = MENU_SECTIONS.flatMap((section) => section.dishes).find(
  (dish) => dish.id === "veal-rack"
)!

export function dietGuestsFromNames(names: string[]): DietGuest[] {
  const result: DietGuest[] = []
  names.forEach((name, index) => {
    if (!name) return
    if (isVegetarian(name)) {
      result.push({
        seat: index + 1,
        name,
        displayName: displayGuestName(name),
        kind: "vegetarian",
      })
      return
    }
    if (isNoBeef(name)) {
      result.push({
        seat: index + 1,
        name,
        displayName: displayGuestName(name),
        kind: "no-beef",
      })
    }
  })
  return result
}

export function dietCounts(names: string[]) {
  const diets = dietGuestsFromNames(names)
  return {
    vegetarian: diets.filter((guest) => guest.kind === "vegetarian").length,
    noBeef: diets.filter((guest) => guest.kind === "no-beef").length,
  }
}

export function tableLabel(id: string) {
  const table = tableById(id)
  if (!table || table.id === "head") return "主桌"
  return `${table.label} 桌`
}

export function venueDietSummary(guests: GuestMap) {
  const tables = TABLE_ORDER.flatMap((id) => {
    const table = tableById(id)
    if (!table) return []
    const diets = dietGuestsFromNames(guests[id] ?? [])
    if (diets.length === 0) return []
    return [
      {
        tableId: id,
        label: tableLabel(id),
        title: table.title,
        diets,
        vegetarian: diets.filter((guest) => guest.kind === "vegetarian"),
        noBeef: diets.filter((guest) => guest.kind === "no-beef"),
      },
    ]
  })

  return {
    tables,
    noBeef: tables.flatMap((table) => table.noBeef),
    vegetarian: tables.flatMap((table) => table.vegetarian),
  }
}

export const PORTION_NOTES = (() => {
  const head = TABLES.find((table) => table.id === "head")
  const extras = TABLES.filter(
    (table) => table.id !== "head" && table.seats !== MENU.guestsPerTable
  )
  const extraText = extras
    .map((table) => `${table.label} 桌 ${table.seats} 席`)
    .join("、")
  return [
    `菜單以每桌 ${MENU.guestsPerTable} 位計價；主桌 ${head?.seats ?? 12} 席${extraText ? `，${extraText}` : ""}，請加點份數。`,
    "14 桌另備兒童座椅 1（廖宇軒小朋友，不佔主位），兒童餐另洽飯店。",
  ]
})()
