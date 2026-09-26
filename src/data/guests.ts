import { emptyGuests } from "@/data/venue"

/**
 * Word 確認版桌號 → 場地桌號。
 * 面對舞台：左男右女。伊諾科技兩桌在左側走道 13、14。
 */
export const WORD_TO_VENUE: Record<string, string> = {
  head: "head",
  "1": "12",
  "2": "15",
  "3": "18",
  "5": "20",
  "6": "21",
  "7": "16",
  "8": "17",
  "9": "19",
  "10": "13",
  "11": "14",
}

/** 男方確認版桌次（V2／1150828）。鍵為 Word 原桌號。場地 13、14 為伊諾科技桌。 */
export const WORD_GUESTS: Record<string, string[]> = {
  head: [
    "江紀武",
    "林鈺瑾",
    "林活汶",
    "葉秋華·不吃牛",
    "葉秋英",
    "鄭森義",
    "張榮興",
    "魏志名",
    "蔡航仙",
    "黃競良",
    "楊秋玉",
    "江守寰·不吃牛",
  ],
  "1": [
    "魏靜瑄",
    "魏銘龍",
    "陳德樹",
    "陳德樹 2",
    "彭兼昌",
    "張文興",
    "伊金泉",
    "翁李源",
    "林弘曜",
    "許嘉樺",
  ],
  "2": [
    "江銘君",
    "黃洲祥",
    "阮阿綢·不吃牛",
    "張巧玲",
    "張雅媛·不吃牛",
    "江紀威",
    "江述禾",
    "林娓華",
    "游本明",
  ],
  "3": [
    "楊秋姍",
    "楊秋姍 2·不吃牛",
    "楊秋姍 3",
    "楊秋姍 4",
    "李冠誼／李秀鳳",
    "李冠誼／李秀鳳 2",
    "鄒金鑾·不吃牛",
    "鄒金鑾 2·不吃牛",
    "張如慧·不吃牛",
    "張如慧 2·不吃牛",
  ],
  "5": [
    "楊秋玲",
    "楊秋玲 2·不吃牛",
    "楊秋玲 3",
    "楊秋玲 4",
    "楊秋玲 5",
    "楊秋玲 6",
    "楊秋玲 7",
    "楊秋琪",
    "楊秋琪 2",
    "楊秋瑛",
  ],
  "6": [
    "楊秋瑛",
    "楊秋瑛 2",
    "楊秋瑛 3",
    "楊秋瑛 4",
    "楊秋珍",
    "楊秋珍 2",
    "楊秋珍 3",
    "楊秋珍 4",
    "楊秋珍 5",
    "楊秋珍 6",
  ],
  "7": [
    "張國雄",
    "劉傳璽",
    "黃維堅",
    "黃維堅 2",
    "張榮貴",
    "張榮貴 2",
    "呂俊翰",
    "呂俊翰 2",
    "呂俊翰 3",
    "呂俊翰 4",
    "呂俊翰 5",
  ],
  "8": [
    "廖恆裕",
    "張厚齊·素食",
    "潘志成",
    "李天文",
    "李添益",
    "王英郁／高雄同學",
    "揚威孫",
    "曾啟彥",
    "蔡上機",
    "李承龍",
  ],
  "9": [
    "楊鄉懿",
    "楊鄉懿 2",
    "張永辛眷屬",
    "張永辛",
    "林天福",
    "林天福 2",
    "江志成",
    "江志成 2",
    "林國平",
    "林存讓",
    "李晃旭",
    "李晃旭 2",
  ],
  "10": [
    "Taylor 陳俊諺",
    "Taylor 陳俊諺 2",
    "Winnie 王薏雯",
    "Lory 顏慧玲",
    "Lory 顏慧玲 2",
    "Lory 顏慧玲 3",
    "Max 張祐誠",
    "Olivia 呂玗潔",
    "Joyce 曾鈺鈞",
    "Jerry 藍元皇",
    "Banana 劉語斌",
  ],
  "11": [
    "Ben 廖宇軒",
    "Ben 廖宇軒 2",
    "Ben 廖宇軒 3",
    "Ben 廖宇軒 4",
    "Peggy 石佩玉",
    "George 郭建宏",
    "Quentina 邱婷圓",
    "Allen 王淇生",
    "Eva 蔡依雯",
    "Eva 蔡依雯 2",
    "Dio 張敬暘",
  ],
}

/**
 * 女方確認版（9/20 文華東方對照表）。鍵為場地桌號。
 * 面對舞台右側：1 艾克森／萬里雲、2 艾克森、3 創順、8 萬里雲、11 仁寶、10 預備桌。
 */
export const BRIDE_GUESTS: Record<string, string[]> = {
  "1": [
    "Ada",
    "Ada 2",
    "奶茶",
    "許辰瑞",
    "YT",
    "丁志杰／Jeremy",
    "李礴軒／Lester",
    "洪梓翔",
    "廖淯婷",
    "廖淯婷 2",
    "廖淯婷 3",
  ],
  "2": [
    "Gino",
    "Shirley",
    "Tric",
    "Zmic",
    "宋玉琨／Lauren",
    "林伯瑾",
    "王崧豪",
    "陳癸庚／Brandan",
    "陳諭",
    "陳諭 2",
    "王承皓",
  ],
  "3": [
    "Hiro",
    "Phoebe",
    "Sara Lyn",
    "Sara Lyn 2",
    "吳孟錡",
    "許嘉晏",
    "吳尹泰",
    "李於軒",
    "吳宜蒨",
    "林佳倪",
  ],
  "5": [
    "林淑惠",
    "林淑惠 2",
    "林淑惠 3",
    "林淑惠 4",
    "林瑞蓉",
    "林瑞蓉 2",
    "林瑞蓉 3",
    "林武煌",
  ],
  "6": [
    "尤晟彥",
    "尤晟彥 2",
    "楊御書",
    "楊御書 2",
    "葉倫松",
    "葉斯廷",
    "鄭諺隆",
  ],
  "7": [
    "林煜峰",
    "鄭育萱",
    "鄭育萱 2",
    "鄭育萱 3",
    "鄭育萱 4",
    "鄭椀云",
    "鄭椀孺",
    "謝竺恩",
    "謝竺恩2",
    "黃雅萱／Lia",
  ],
  "8": [
    "張家瑋／Welly",
    "張維軒",
    "林敬傑",
    "鄭有為",
    "楊季穎／Evelyn",
    "陳子揚／Jeff Chen",
    "陳楷榮／Aaron",
    "許安宇",
    "徐裕洋",
    "蔡世緯",
  ],
  "9": [
    "林佳諭",
    "林佳諭 2",
    "林佳諭 3",
    "林瑞鴻",
    "林瑞鴻 2",
    "林瑞鴻 3",
    "林瑞鴻 4",
    "麥素華",
  ],
  "11": [
    "Anita",
    "Anita2",
    "Ethan",
    "Louis",
    "Mindy",
    "Shawn 翁祥恩",
    "廖瑜瑄／Peggy·不吃牛",
    "林振鴻／Neo",
  ],
}

export function defaultGuests() {
  const guests = emptyGuests()
  for (const [wordId, names] of Object.entries(WORD_GUESTS)) {
    const venueId = WORD_TO_VENUE[wordId] ?? wordId
    if (!guests[venueId]) continue
    guests[venueId] = guests[venueId].map((_, i) => names[i] ?? "")
  }
  for (const [venueId, names] of Object.entries(BRIDE_GUESTS)) {
    if (!guests[venueId]) continue
    guests[venueId] = guests[venueId].map((_, i) => names[i] ?? "")
  }
  return guests
}

export function isVegetarian(name: string) {
  return name.includes("素食")
}

export function isNoBeef(name: string) {
  return name.includes("不吃牛")
}

/** 畫面顯示用：飲食禁忌改由座號顏色表示，不重複寫在姓名後。 */
export function displayGuestName(name: string) {
  return name.replace(/·不吃牛/g, "").replace(/·素食/g, "").trim()
}
