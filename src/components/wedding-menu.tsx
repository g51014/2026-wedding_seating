"use client"

import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { SeatNumber } from "@/components/seat-number"
import {
  MENU,
  MENU_SECTIONS,
  PORTION_NOTES,
  tableLabel,
  venueDietSummary,
  type MenuDish,
} from "@/data/menu"
import type { GuestMap } from "@/lib/seating"

type WeddingMenuProps = {
  guests: GuestMap
  onSelectTable?: (id: string) => void
}

function DishMarks({ dish }: { dish: MenuDish }) {
  return (
    <span className="ml-1 inline-flex flex-wrap gap-1 align-middle">
      {dish.service === "plated" && (
        <Badge variant="outline" className="h-4 border-amber-300 bg-white px-1.5 text-[10px] text-[#92400e]">
          {dish.serviceNote ?? "位上"}
        </Badge>
      )}
      {dish.service === "lazy-susan" && !dish.serviceNote && (
        <Badge variant="outline" className="h-4 border-amber-200 bg-[#fffaf3] px-1.5 text-[10px] text-[#92400e]">
          轉台
        </Badge>
      )}
      {dish.containsBeef && (
        <Badge className="h-4 bg-pink-300 px-1.5 text-[10px] text-pink-950">含牛</Badge>
      )}
      {dish.containsPork && (
        <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
          含豬
        </Badge>
      )}
    </span>
  )
}

export function WeddingMenu({ guests, onSelectTable }: WeddingMenuProps) {
  const summary = venueDietSummary(guests)

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-amber-200 bg-[#fffaf3] p-4 text-sm leading-relaxed text-[#7c2d12]">
        <p className="font-heading text-base text-[#7c2d12]">給廚房的改菜摘要</p>
        <p className="mt-2">
          不吃牛 {summary.noBeef.length} 人：拼盤牛腱自行不取；位上小牛肋排需改{" "}
          {summary.noBeef.length} 份。
        </p>
        <p>
          素食 {summary.vegetarian.length} 人：請出整套素食位上（迎賓小碟與甜點可共用）。
        </p>
        <ul className="mt-3 space-y-2">
          {summary.tables.map((table) => {
            const body = (
              <>
                <span className="font-medium">{table.label}</span>
                <span className="text-[#92400e]"> · {table.title}</span>
                {table.noBeef.length > 0 && (
                  <span className="ml-2 text-pink-800">不吃牛 {table.noBeef.length}</span>
                )}
                {table.vegetarian.length > 0 && (
                  <span className="ml-2 text-green-800">素食 {table.vegetarian.length}</span>
                )}
                <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#3f2a1d]">
                  {table.diets.map((guest) => (
                    <span key={`${table.tableId}-${guest.seat}`} className="inline-flex items-center gap-1">
                      <SeatNumber
                        seat={guest.seat}
                        name={guest.name}
                        className="size-5 text-[10px]"
                      />
                      {guest.displayName}
                    </span>
                  ))}
                </span>
              </>
            )
            if (!onSelectTable) {
              return (
                <li
                  key={table.tableId}
                  className="rounded-lg border border-amber-100 bg-white/70 px-3 py-2"
                >
                  {body}
                </li>
              )
            }
            return (
              <li key={table.tableId}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-amber-100 bg-white/70 px-3 py-2 text-left hover:border-amber-300 hover:bg-white"
                  onClick={() => onSelectTable(table.tableId)}
                >
                  {body}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <article className="rounded-2xl border border-amber-200 bg-[#fffaf3] px-5 py-6 md:px-8">
          <p className="text-center text-xs tracking-[0.35em] text-[#b45309]">{MENU.hotel}</p>
          <h2 className="mt-2 text-center font-heading text-2xl text-[#7c2d12]">{MENU.titleZh}</h2>
          <p className="mt-1 text-center text-xs tracking-[0.2em] text-[#92400e]">{MENU.titleEn}</p>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#92400e]">
            {MENU.intro}
          </p>

          <div className="mt-6 space-y-6">
            {MENU_SECTIONS.map((section) => (
              <section key={section.id}>
                <div className="mb-2 flex items-baseline justify-between gap-3 border-b border-amber-200 pb-1">
                  <h3 className="font-heading text-lg text-[#7c2d12]">{section.titleZh}</h3>
                  {section.titleEn && (
                    <p className="text-[11px] tracking-wide text-[#b45309] uppercase">{section.titleEn}</p>
                  )}
                </div>
                {section.note && <p className="mb-2 text-xs text-[#92400e]">{section.note}</p>}
                <ul className="space-y-3">
                  {section.dishes.map((dish) => (
                    <li key={dish.id}>
                      <p className="text-sm text-[#3f2a1d]">
                        {dish.nameZh}
                        <DishMarks dish={dish} />
                      </p>
                      <p className="text-xs text-[#92400e]">{dish.nameEn}</p>
                      {dish.serviceNote && dish.service === "lazy-susan" && (
                        <p className="text-xs text-[#b45309]">{dish.serviceNote}</p>
                      )}
                      {dish.origin && <p className="text-xs text-[#b45309]">{dish.origin}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-8 text-center font-heading text-[#7c2d12]">
            每桌新台幣 {MENU.priceTwd.toLocaleString("zh-TW")} 元（每桌 {MENU.guestsPerTable} 位賓客）
          </p>
          <p className="mt-1 text-center text-xs text-[#92400e]">{MENU.taxNote}</p>
          <ul className="mt-4 space-y-1 text-xs leading-relaxed text-[#92400e]">
            {PORTION_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>

        <figure className="rounded-2xl border border-amber-200 bg-white p-3 print:hidden">
          <Image
            src={MENU.image}
            alt="文華東方中式婚宴菜單原圖"
            className="h-auto w-full"
            width={700}
            height={990}
          />
          <figcaption className="mt-2 text-sm text-[#92400e]">飯店原菜單（35800／桌）</figcaption>
        </figure>
      </div>
    </div>
  )
}

export function PrintMenu({ guests }: { guests: GuestMap }) {
  const summary = venueDietSummary(guests)
  return (
    <div>
      <h2 className="mb-3 font-heading text-xl text-[#7c2d12]">宴席菜單與改菜</h2>
      <p className="mb-3 text-sm text-[#7c2d12]">
        不吃牛 {summary.noBeef.length} 人需改位上小牛肋排；素食 {summary.vegetarian.length}{" "}
        人需整套素食位上。
      </p>
      <ul className="mb-4 columns-2 gap-4 text-sm">
        {summary.tables.map((table) => (
          <li key={table.tableId} className="mb-2 break-inside-avoid">
            {table.label}：
            {table.diets
              .map((guest) => `${guest.seat} 號 ${guest.displayName}（${guest.kind === "vegetarian" ? "素食" : "不吃牛"}）`)
              .join("、")}
          </li>
        ))}
      </ul>
      <p className="text-xs text-[#92400e]">
        {tableLabel("head")}與加椅桌（1、2、13、14、17）請按實際人數加點。餐自：1、2 桌各 1 席自 5 桌，13 桌自 9 桌，14 桌自 8 桌，17 桌自 15 桌。完整菜名見宴席菜單分頁。
      </p>
    </div>
  )
}
