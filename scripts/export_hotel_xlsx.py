# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os
import re
import zipfile
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "2026-10-04-江林府喜宴-文華東方對照表.xlsx")

WORD_TO_VENUE = {
    "head": "head",
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

WORD_GUESTS = {
    "head": [
        "江紀武（新郎）",
        "林鈺瑾（新娘）",
        "林活汶（新娘父親）",
        "葉秋華（新娘母親）·不吃牛",
        "葉秋英（新娘長輩）",
        "鄭森義（新娘長輩）",
        "張榮興（警政署長）",
        "魏志名（新郎父親乾爸）",
        "蔡航仙（新郎父親乾媽）",
        "黃競良（新郎奶奶）",
        "楊秋玉（新郎母親）",
        "江守寰（新郎父親）·不吃牛",
    ],
    "1": ["魏靜瑄（新郎魏爺爺胞姊）", "魏銘龍（新郎魏爺爺的胞弟）", "陳德樹", "陳德樹 2", "彭兼昌", "張文興", "伊金泉", "翁李源", "林弘曜", "許嘉樺"],
    "2": ["江銘君（新郎大姑姑）", "黃洲祥（新郎小姑爹）", "阮阿綢·不吃牛", "張巧玲", "張雅媛·不吃牛", "江紀威", "江述禾", "林娓華（警政署督察室辦事員）", "簡達人（基隆警局資訊科長）", "游本明（新郎表姊）"],
    "3": ["楊秋姍", "楊秋姍 2·不吃牛", "楊秋姍 3", "楊秋姍 4", "李冠誼（李秀鳳）", "李冠誼（李秀鳳） 2", "鄒金鑾·不吃牛", "鄒金鑾 2·不吃牛", "張如慧·不吃牛", "張如慧 2·不吃牛"],
    "5": ["楊秋玲", "楊秋玲 2·不吃牛", "楊秋玲 3", "楊秋玲 4", "楊秋玲 5", "楊秋玲 6", "楊秋玲 7", "楊秋琪", "楊秋琪 2", "楊秋瑛"],
    "6": ["楊秋瑛", "楊秋瑛 2", "楊秋瑛 3", "楊秋瑛 4", "楊秋珍", "楊秋珍 2", "楊秋珍 3", "楊秋珍 4", "楊秋珍 5", "楊秋珍 6"],
    "7": ["張國雄（保一總隊長）", "劉傳璽（師大教授）", "林國平（前國民黨金門主委）", "黃維堅（金門消防局科長）", "黃維堅 2", "林存讓（新北市警局警友會）", "李晃旭", "李晃旭 2", "張榮貴（Ai3智能公司董事長）", "張榮貴 2"],
    "8": ["廖恆裕（桃園市警察局長）", "張厚齊（警政署專門委員）·素食", "潘志成（警政署督察）", "潘志成 2", "李天文（扶輪社社長）", "李添益（行政院參議）", "王英郁（高雄同學）", "揚威孫（天威保全董事長）", "曾啟彥（高雄市警局督察）", "蔡上機（命理大師）", "李承龍（警專教授）"],
    "9": ["楊鄉懿（情報局處長）", "楊鄉懿 2", "楊進豐（情報局副處長）", "李皇德（利優生醫總經理）", "張永辛（利優生醫）", "林天福（桃園金門同鄉會長）", "林天福 2", "江志成（智順科技董事長）", "江志成 2", "呂俊翰（金門縣警局金城分局）"],
    "10": ["Taylor 陳俊諺", "Taylor 陳俊諺 2", "Winnie 王薏雯", "Lory 顏慧玲", "Lory 顏慧玲 2", "Lory 顏慧玲 3", "Max 張祐誠", "Olivia 呂玗潔", "Joyce 曾鈺鈞", "Jerry 藍元皇", "Banana 劉語斌"],
    "11": ["Ben 廖宇軒", "Ben 廖宇軒 2", "Ben 廖宇軒 3", "Peggy 石佩玉", "George 郭建宏", "Quentina 邱婷圓", "Allen 王淇生", "Eva 蔡依雯", "Eva 蔡依雯 2", "Dio 張敬暘"],
}

BRIDE_GUESTS = {
    "1": ["Ada", "Ada 2", "Ada 3", "Hsu Chen Jui", "YT", "丁志杰／Jeremy", "李礴軒／Lester", "洪梓翔", "王承皓", "恩恩大小姐（萬里雲）", "恩恩大小姐 2（萬里雲）", "黃雅萱／Lia（萬里雲）"],
    "2": ["Gino", "Shirley", "Tric", "Zmic（艾克森）", "宋玉琨／Lauren", "林伯瑾·素食", "王崧豪", "陳癸庚／Brandan", "陳諭", "陳諭 2"],
    "11": ["張家瑋／Welly（萬里雲）", "張維軒", "林敬傑（萬里雲）", "林敬傑（萬里雲）", "楊季穎／Evelyn（萬里雲）", "楊季穎 2", "陳子揚／Jeff Chen（萬里雲）", "陳楷榮／Aaron（萬里雲）", "許安宇（萬里雲）", "玉陽（萬里雲）"],
    "7": ["林煜峰（新娘哥哥）", "葉斯櫻", "葉斯櫻 2", "葉斯櫻 3", "鄭育萱（新娘二阿姨）", "鄭育萱 2", "鄭育萱 3", "鄭育萱 4", "麥素華"],
    "3": ["Hiro", "Phoebe", "Sara Lyn（創順）", "Sara Lyn 2（創順）", "吳孟錡、許嘉晏（仁寶）", "吳孟錡、許嘉晏 2（仁寶）", "吳孟錡、許嘉晏 3（仁寶）", "李於軒（創順）", "廖淯婷", "廖淯婷 2", "廖淯婷 3"],
    "6": ["尤晟彥", "尤晟彥 2", "楊御書", "楊御書 2", "葉倫松", "葉斯廷", "鄭椀云", "鄭椀孺", "鄭諺隆"],
    "5": ["林淑惠（新娘姑姑）", "林淑惠 2", "林淑惠 3", "林淑惠 4", "林瑞蓉", "林瑞蓉 2", "林瑞蓉 3"],
    "9": ["林佳諭", "林佳諭 2", "林佳諭 3", "林武煌", "林瑞鴻", "林瑞鴻 2", "林瑞鴻 3", "林瑞鴻 4"],
    "8": ["Anita（仁寶）", "Anita（仁寶）2", "Ethan（仁寶）", "Louis（仁寶）", "Mindy（仁寶）", "Shawn 翁祥恩（仁寶）", "廖瑜瑄／Peggy（仁寶）·不吃牛", "林振鴻／Neo（仁寶）", "吳宜蒨", "林佳倪"],
}

TABLES = [
    dict(id="head", label="主桌", alias="主桌", seats=12, side="中"),
    dict(id="1", label="1", alias="艾克森科技／萬里雲科技", seats=12, side="右", cover_from="5"),
    dict(id="2", label="2", alias="艾克森科技", seats=10, side="右"),
    dict(id="3", label="3", alias="創順科技", seats=11, side="右", cover_from="7", child="吳孟錡"),
    dict(id="5", label="5", alias="林家親友", seats=10, side="右", spare=2, cover_to="1", keep_empty=1),
    dict(id="6", label="6", alias="葉家親友", seats=10, side="右", spare=1, cover_to="17"),
    dict(id="7", label="7", alias="林家親友", seats=10, side="右", spare=1, cover_to="3"),
    dict(id="8", label="8", alias="仁寶科技", seats=10, side="右"),
    dict(id="9", label="9", alias="林家親友", seats=10, side="右", spare=1, cover_to="13", keep_empty=1),
    dict(id="10", label="10", alias="預備", seats=10, side="右", reserve=True),
    dict(id="11", label="11", alias="萬里雲科技", seats=10, side="右"),
    dict(id="12", label="12", alias="新郎父親好友", seats=10, side="左"),
    dict(id="13", label="13", alias="伊諾科技", seats=11, side="左", cover_from="9", child="Lory"),
    dict(id="14", label="14", alias="伊諾科技", seats=10, side="左", child="廖宇軒"),
    dict(id="15", label="15", alias="江家親友", seats=10, side="左"),
    dict(id="16", label="16", alias="新郎父親好友", seats=10, side="左"),
    dict(id="17", label="17", alias="新郎父親好友", seats=11, side="左", cover_from="6"),
    dict(id="18", label="18", alias="楊家親友", seats=10, side="左"),
    dict(id="19", label="19", alias="新郎父親好友", seats=10, side="左"),
    dict(id="20", label="20", alias="楊家親友", seats=10, side="左"),
    dict(id="21", label="21", alias="楊家親友", seats=10, side="左"),
]

FLOOR_ORDER = ["head", "1", "2", "3", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]

# styles
S_DEFAULT, S_TITLE, S_HEAD, S_NOTE, S_VEG, S_BEEF, S_MOVE, S_EMPTY, S_KEEP, S_EXTRA, S_SECTION, S_CHILD = range(12)


def xml_esc(text):
    return (
        unicode(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def col_letter(n):
    s = ""
    while n:
        n, r = divmod(n - 1, 26)
        s = chr(65 + r) + s
    return s


TITLE_HINTS = (
    "新郎", "新娘", "父親", "母親", "長輩", "姑姑", "哥哥", "阿姨",
    "署長", "教授", "局長", "委員", "社長", "董事", "會長", "科長",
    "處長", "總隊", "主委", "參議", "督察", "辦事員", "副處長", "總經理",
    "仁寶", "萬里雲", "創順", "艾克森", "魏爺爺", "乾爸", "乾媽",
    "胞姊", "胞弟", "大姑姑", "小姑爹", "表姊", "命理", "警友",
    "同鄉", "情報", "利優", "智順", "金門", "小朋友",
)


def hotel_name(name):
    text = name.replace("·不吃牛", "").replace("·素食", "").strip()
    text = text.replace("恩恩大小姐", "謝竺恩")
    def repl(match):
        inner = match.group(1)
        if any(hint in inner for hint in TITLE_HINTS):
            return ""
        return "／" + inner
    text = re.sub("（([^）]+)）", repl, text)
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace(" ／", "／").replace("／ ", "／")
    return text.strip("／ ")


def display_name(name):
    return hotel_name(name)


def diet_of(name):
    if not name:
        return ""
    if "素食" in name:
        return "素食"
    if "不吃牛" in name:
        return "不吃牛"
    return ""


def diet_action(diet):
    if diet == "素食":
        return "整套素食位上（迎賓小碟與甜點可共用）"
    if diet == "不吃牛":
        return "拼盤牛腱自行不取；位上小牛肋排改菜"
    return ""


def table_by_id(tid):
    for table in TABLES:
        if table["id"] == tid:
            return table
    return None


def table_label(tid):
    table = table_by_id(tid)
    if not table or table["id"] == "head":
        return "主桌"
    return table["label"] + "桌"


def table_alias(tid):
    table = table_by_id(tid)
    return table["alias"] if table else ""


def child_tables():
    return [table for table in TABLES if table.get("child")]


def child_summary():
    return "；".join("%s %s" % (table_label(table["id"]), table["child"]) for table in child_tables())


def build_guests():
    guests = {}
    for table in TABLES:
        guests[table["id"]] = [""] * table["seats"]
    for word_id, names in WORD_GUESTS.items():
        venue_id = WORD_TO_VENUE.get(word_id, word_id)
        if venue_id not in guests:
            continue
        seats = len(guests[venue_id])
        guests[venue_id] = [(names[i] if i < len(names) else "") for i in range(seats)]
    for venue_id, names in BRIDE_GUESTS.items():
        if venue_id not in guests:
            continue
        seats = len(guests[venue_id])
        guests[venue_id] = [(names[i] if i < len(names) else "") for i in range(seats)]
    return guests


def spare_seats(names, spare):
    if not spare:
        return []
    empties = [i + 1 for i, name in enumerate(names) if not name]
    return empties[-spare:]


def seat_status(table, names, seat):
    extra = 0 if table["id"] == "head" else max(0, table["seats"] - 10)
    name = names[seat - 1]
    moved = spare_seats(names, table.get("spare") or 0)
    if seat in moved:
        return "移餐額度"
    if table.get("reserve") and not name:
        return "預備空位"
    if extra and seat > 10:
        return "超額加椅"
    if name:
        return "實坐"
    if table.get("keep_empty"):
        return "空位保留"
    return "空位"


def seat_style(status, diet):
    if diet == "素食":
        return S_VEG
    if diet == "不吃牛":
        return S_BEEF
    return {
        "移餐額度": S_MOVE,
        "空位保留": S_KEEP,
        "預備空位": S_EMPTY,
        "超額加椅": S_EXTRA,
        "空位": S_EMPTY,
    }.get(status, S_DEFAULT)


def guest_note(table, names, seat):
    bits = []
    status = seat_status(table, names, seat)
    if status == "移餐額度":
        bits.append("餐具移給%s加椅，不另收費" % table_label(table.get("cover_to")))
    if status == "超額加椅":
        bits.append("餐具由%s空位調配" % table_label(table.get("cover_from")))
    if table.get("child") and seat == 1:
        bits.append("兒童座椅：%s" % table["child"])
    if table.get("reserve"):
        bits.append("整桌預備，不列入移餐")
    return "；".join(bits)


def cell(col, row, value, style=S_DEFAULT):
    ref = "%s%s" % (col_letter(col), row)
    if value is None or value == "":
        return '<c r="%s" s="%s"/>' % (ref, style)
    if isinstance(value, int):
        return '<c r="%s" s="%s"><v>%s</v></c>' % (ref, style, value)
    return '<c r="%s" t="inlineStr" s="%s"><is><t xml:space="preserve">%s</t></is></c>' % (
        ref,
        style,
        xml_esc(value),
    )


def row_xml(r, values, styles=None, height=28):
    styles = styles or []
    cells = []
    for i, value in enumerate(values):
        style = styles[i] if i < len(styles) else S_DEFAULT
        cells.append(cell(i + 1, r, value, style))
    return '<row r="%s" ht="%s" customHeight="1">%s</row>' % (r, height, "".join(cells))


def sheet_xml(rows, widths, freeze_row=1, auto_ref=None, merge=None):
    cols = []
    for i, width in enumerate(widths, 1):
        cols.append('<col min="%s" max="%s" width="%s" customWidth="1"/>' % (i, i, width))
    merges = ""
    if merge:
        merges = "<mergeCells count=\"%s\">%s</mergeCells>" % (
            len(merge),
            "".join('<mergeCell ref="%s"/>' % ref for ref in merge),
        )
    auto = ('<autoFilter ref="%s"/>' % auto_ref) if auto_ref else ""
    freeze = (
        '<sheetViews><sheetView workbookViewId="0" showGridLines="1">'
        "%s"
        "</sheetView></sheetViews>"
        '<sheetFormatPr defaultRowHeight="28" customHeight="1"/>'
    ) % (
        (
            '<pane ySplit="%s" topLeftCell="A%s" activePane="bottomLeft" state="frozen"/>'
            % (freeze_row, freeze_row + 1)
        )
        if freeze_row
        else ""
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"'
        ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        "%s<cols>%s</cols><sheetData>%s</sheetData>%s%s"
        '<pageSetup orientation="landscape" paperSize="9"/>'
        "</worksheet>"
    ) % (freeze, "".join(cols), "".join(rows), auto, merges)


def styles_xml():
    # Fill 0 = none and fill 1 = gray125 are required by Excel.
    # All used cell styles then use solid fills so text never sits on a dark theme.
    fill_xml = [
        '<fill><patternFill patternType="none"/></fill>',
        '<fill><patternFill patternType="gray125"/></fill>',
    ]
    for color in (
        "FFFFFF",  # 2 default white
        "1C1917",  # 3 header black
        "166534",  # 4 veg
        "9F1239",  # 5 beef
        "0F766E",  # 6 move
        "E4E4E7",  # 7 empty
        "1E3A8A",  # 8 extra
        "FEF08A",  # 9 keep
        "B45309",  # 10 child
    ):
        fill_xml.append(
            '<fill><patternFill patternType="solid"><fgColor rgb="FF%s"/><bgColor rgb="FF%s"/></patternFill></fill>'
            % (color, color)
        )
    fonts = [
        '<font><sz val="14"/><color rgb="FF000000"/><name val="Microsoft JhengHei"/><family val="2"/><charset val="136"/></font>',
        '<font><b/><sz val="14"/><color rgb="FFFFFFFF"/><name val="Microsoft JhengHei"/><family val="2"/><charset val="136"/></font>',
        '<font><b/><sz val="14"/><color rgb="FF000000"/><name val="Microsoft JhengHei"/><family val="2"/><charset val="136"/></font>',
    ]
    xfs = [
        (0, 2),   # default black on white
        (2, 2),   # title unused
        (1, 3),   # header white on black
        (0, 2),   # note unused
        (1, 4),   # veg white on green
        (1, 5),   # beef white on rose
        (1, 6),   # move white on teal
        (2, 7),   # empty black on gray
        (2, 9),   # keep black on yellow
        (1, 8),   # extra white on navy
        (1, 3),   # section white on black
        (1, 10),  # child white on amber
    ]
    xf_xml = []
    for font_id, fill_id in xfs:
        xf_xml.append(
            '<xf numFmtId="0" fontId="%s" fillId="%s" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">'
            '<alignment wrapText="1" vertical="center" horizontal="left"/></xf>'
            % (font_id, fill_id)
        )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        "<fonts count=\"%s\">%s</fonts>"
        "<fills count=\"%s\">%s</fills>"
        '<borders count="2">'
        "<border/><border>"
        '<left style="thin"><color rgb="FF78716C"/></left>'
        '<right style="thin"><color rgb="FF78716C"/></right>'
        '<top style="thin"><color rgb="FF78716C"/></top>'
        '<bottom style="thin"><color rgb="FF78716C"/></bottom>'
        "<diagonal/>"
        "</border></borders>"
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        "<cellXfs count=\"%s\">%s</cellXfs>"
        "</styleSheet>"
    ) % (len(fonts), "".join(fonts), len(fill_xml), "".join(fill_xml), len(xfs), "".join(xf_xml))


def build_overview(guests):
    filled = 0
    empty = 0
    veg = 0
    beef = 0
    for table in TABLES:
        names = guests[table["id"]]
        for name in names:
            if name:
                filled += 1
                d = diet_of(name)
                if d == "素食":
                    veg += 1
                elif d == "不吃牛":
                    beef += 1
            else:
                empty += 1
    rows = [
        row_xml(1, ["項目", "內容"], [S_HEAD, S_HEAD]),
        row_xml(2, ["桌數", "%s 桌（含主桌、預備桌；場地無 4 號）" % len(TABLES)]),
        row_xml(3, ["編制席", sum(t["seats"] for t in TABLES)]),
        row_xml(4, ["實坐", filled]),
        row_xml(5, ["空位", empty]),
        row_xml(6, ["不吃牛", "%s 人，小牛肋排改 %s 份" % (beef, beef)], [S_BEEF, S_BEEF]),
        row_xml(7, ["素食", "%s 人，整套素食位上" % veg], [S_VEG, S_VEG]),
        row_xml(8, ["兒童座椅", child_summary() + "（不佔主位）"], [S_CHILD, S_CHILD]),
        row_xml(9, ["移餐", "5桌2份→1桌；7桌1份→3桌；9桌1份→13桌；6桌1份→17桌"]),
    ]
    return sheet_xml(rows, [14, 70], freeze_row=1)


def build_kitchen(guests):
    rows = [
        row_xml(
            1,
            ["桌號", "代稱", "座號", "姓名", "禁忌", "處理"],
            [S_HEAD] * 6,
        ),
    ]
    r = 2
    veg_n = beef_n = 0
    for tid in FLOOR_ORDER:
        table = table_by_id(tid)
        names = guests[tid]
        for i, name in enumerate(names):
            diet = diet_of(name)
            if not diet:
                continue
            if diet == "素食":
                veg_n += 1
            else:
                beef_n += 1
            style = S_VEG if diet == "素食" else S_BEEF
            rows.append(
                row_xml(
                    r,
                    [table_label(tid), table_alias(tid), i + 1, display_name(name), diet, diet_action(diet)],
                    [S_DEFAULT, S_DEFAULT, S_DEFAULT, S_DEFAULT, style, S_DEFAULT],
                )
            )
            r += 1
    last_diet = r - 1
    rows.append(
        row_xml(
            r,
            ["合計", "", "", "", beef_n + veg_n, "不吃牛 %s；素食 %s" % (beef_n, veg_n)],
            [S_SECTION, S_DEFAULT, S_DEFAULT, S_DEFAULT, S_SECTION, S_SECTION],
        )
    )
    return sheet_xml(rows, [10, 16, 8, 22, 10, 36], freeze_row=1, auto_ref="A1:F%s" % last_diet)


def build_covers(guests):
    rows = [
        row_xml(1, ["來源桌", "代稱", "移出座號", "份數", "移給桌", "代稱", "加椅後席數"], [S_HEAD] * 7),
    ]
    r = 2
    moves = [("5", "1"), ("7", "3"), ("9", "13"), ("6", "17")]
    for src_id, dst_id in moves:
        src = table_by_id(src_id)
        dst = table_by_id(dst_id)
        moved = spare_seats(guests[src_id], src.get("spare") or 0)
        rows.append(
            row_xml(
                r,
                [
                    table_label(src_id),
                    table_alias(src_id),
                    "、".join("%s號" % s for s in moved) or "—",
                    src.get("spare") or 0,
                    table_label(dst_id),
                    table_alias(dst_id),
                    dst["seats"],
                ],
                [S_MOVE, S_DEFAULT, S_MOVE, S_MOVE, S_EXTRA, S_DEFAULT, S_EXTRA],
            )
        )
        r += 1
    for table in child_tables():
        rows.append(
            row_xml(
                r,
                [
                    table_label(table["id"]),
                    table_alias(table["id"]),
                    "兒童座椅",
                    1,
                    "",
                    table["child"],
                    "不佔主位",
                ],
                [S_CHILD] * 7,
            )
        )
        r += 1
    return sheet_xml(rows, [10, 16, 14, 8, 10, 16, 12], freeze_row=1, auto_ref="A1:G%s" % (r - 1))


def build_table_list(guests):
    rows = [
        row_xml(
            1,
            ["桌號", "代稱", "位置", "席數", "實坐", "空位", "不吃牛", "素食", "移餐"],
            [S_HEAD] * 9,
        ),
    ]
    r = 2
    for tid in FLOOR_ORDER:
        table = table_by_id(tid)
        names = guests[tid]
        filled = len([n for n in names if n])
        empty = table["seats"] - filled
        beef = len([n for n in names if diet_of(n) == "不吃牛"])
        veg = len([n for n in names if diet_of(n) == "素食"])
        extra = 0 if tid == "head" else max(0, table["seats"] - 10)
        move = []
        if table.get("spare"):
            move.append("移出%s→%s" % (table["spare"], table_label(table["cover_to"])))
        if table.get("cover_from"):
            move.append("加椅%s，餐自%s" % (extra, table_label(table["cover_from"])))
        if table.get("reserve"):
            move.append("不移餐")
        if table.get("child"):
            move.append("兒童座椅：%s" % table["child"])
        styles = [S_DEFAULT] * 9
        if beef:
            styles[6] = S_BEEF
        if veg:
            styles[7] = S_VEG
        if table.get("spare"):
            styles[8] = S_MOVE
        elif extra:
            styles[8] = S_EXTRA
        elif table.get("child"):
            styles[8] = S_CHILD
        rows.append(
            row_xml(
                r,
                [
                    table_label(tid),
                    table_alias(tid),
                    table["side"],
                    table["seats"],
                    filled,
                    empty,
                    beef,
                    veg,
                    "；".join(move) or "",
                ],
                styles,
            )
        )
        r += 1
    last = r - 1
    return sheet_xml(rows, [10, 16, 8, 8, 8, 8, 10, 8, 28], freeze_row=1, auto_ref="A1:I%s" % last)


def build_roster(guests):
    rows = [
        row_xml(1, ["桌號", "代稱", "座號", "姓名", "禁忌", "狀態"], [S_HEAD] * 6),
    ]
    r = 2
    for tid in FLOOR_ORDER:
        table = table_by_id(tid)
        names = guests[tid]
        for i, name in enumerate(names):
            seat = i + 1
            diet = diet_of(name)
            status = seat_status(table, names, seat)
            diet_style = S_VEG if diet == "素食" else S_BEEF if diet == "不吃牛" else S_DEFAULT
            status_style = {
                "移餐額度": S_MOVE,
                "空位保留": S_KEEP,
                "預備空位": S_EMPTY,
                "超額加椅": S_EXTRA,
                "空位": S_EMPTY,
            }.get(status, S_DEFAULT)
            rows.append(
                row_xml(
                    r,
                    [
                        table_label(tid),
                        table_alias(tid),
                        seat,
                        display_name(name) if name else "",
                        diet,
                        status if status != "實坐" else "",
                    ],
                    [S_DEFAULT, S_DEFAULT, S_DEFAULT, S_DEFAULT, diet_style, status_style],
                )
            )
            r += 1
        if table.get("child"):
            rows.append(
                row_xml(
                    r,
                    [table_label(tid), table_alias(tid), "兒童", table["child"], "", "兒童座椅"],
                    [S_CHILD] * 6,
                )
            )
            r += 1
    last = r - 1
    return sheet_xml(rows, [10, 16, 8, 24, 10, 12], freeze_row=1, auto_ref="A1:F%s" % last)


CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/worksheets/sheet5.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>
"""

RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
"""

WB_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>
<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet4.xml"/>
<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet5.xml"/>
<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>
"""

WB = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>
<sheet name="統計" sheetId="1" r:id="rId1"/>
<sheet name="改菜" sheetId="2" r:id="rId2"/>
<sheet name="移餐" sheetId="3" r:id="rId3"/>
<sheet name="桌次" sheetId="4" r:id="rId4"/>
<sheet name="座次" sheetId="5" r:id="rId5"/>
</sheets>
</workbook>
"""


def main():
    guests = build_guests()
    files = OrderedDict(
        [
            ("[Content_Types].xml", CONTENT_TYPES),
            ("_rels/.rels", RELS),
            ("xl/workbook.xml", WB),
            ("xl/_rels/workbook.xml.rels", WB_RELS),
            ("xl/styles.xml", styles_xml()),
            ("xl/worksheets/sheet1.xml", build_overview(guests)),
            ("xl/worksheets/sheet2.xml", build_kitchen(guests)),
            ("xl/worksheets/sheet3.xml", build_covers(guests)),
            ("xl/worksheets/sheet4.xml", build_table_list(guests)),
            ("xl/worksheets/sheet5.xml", build_roster(guests)),
        ]
    )
    zf = zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED)
    try:
        for name, data in files.items():
            zf.writestr(name, data.encode("utf-8"))
    finally:
        zf.close()
    print("wrote xlsx")


if __name__ == "__main__":
    main()
