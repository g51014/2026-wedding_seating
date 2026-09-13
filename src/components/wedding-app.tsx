"use client"

import { useMemo, useRef, useState } from "react"
import { Download, Printer, Search, Upload, Users } from "lucide-react"
import Image from "next/image"

import { FloorPlan } from "@/components/floor-plan"
import { RosterList } from "@/components/roster-list"
import { SeatLegend } from "@/components/seat-legend"
import { TableDetail } from "@/components/table-detail"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TABLE_ORDER, tableById, totalSeats } from "@/data/venue"
import {
  downloadJson,
  guestsFromText,
  occupiedCount,
  searchSeats,
  useGuests,
} from "@/lib/seating"

export function WeddingApp() {
  const [guests, setGuests] = useGuests()
  const [selectedId, setSelectedId] = useState<string | null>("13")
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("map")
  const fileRef = useRef<HTMLInputElement>(null)

  const filled = occupiedCount(guests)
  const hits = useMemo(() => searchSeats(guests, query), [guests, query])

  function updateSeat(tableId: string, seat: number, name: string) {
    setGuests((prev) => ({
      ...prev,
      [tableId]: prev[tableId].map((value, index) =>
        index === seat - 1 ? name : value
      ),
    }))
  }

  function handleSelect(id: string | null) {
    setSelectedId(id)
  }

  function handleImport(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? "")
      const parsed = guestsFromText(text)
      if (parsed) setGuests(parsed)
    }
    reader.readAsText(file)
  }

  const selected = selectedId ? tableById(selectedId) : null

  return (
    <div className="min-h-screen bg-[#f6efe4] text-[#3f2a1d]">
      <header className="border-b border-amber-200/80 bg-[#fbf6ee] print:hidden">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#b45309]">
              2026/10/4 · 江林府喜宴
            </p>
            <h1 className="font-heading text-2xl font-semibold text-[#7c2d12] md:text-3xl">
              阿武喜宴場地桌次
            </h1>
            <p className="mt-1 max-w-xl text-sm text-[#92400e]">
              場地依 Grand Ballroom I 示意圖：面對舞台左側 11 桌（男方 12–22）、右側 10 桌（女方 1–3、5–11，無 4 號）。新郎部屬在左側走道 13（A／C／QA）、14（B Team，另備兒童座椅 1）。紅點為 1 號位，順時針。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Users className="size-3.5" />
              {filled} / {totalSeats()} 席已填
            </Badge>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer data-icon="inline-start" />
              列印
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadJson(guests)}>
              <Download data-icon="inline-start" />
              匯出
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload data-icon="inline-start" />
              匯入名單
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".json,.txt,.csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImport(file)
                e.target.value = ""
              }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-4">
          <Tabs value={tab} onValueChange={(value) => { if (typeof value === "string") setTab(value) }}>
          <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between print:hidden">
            <TabsList>
              <TabsTrigger value="map">場地圖</TabsTrigger>
              <TabsTrigger value="roster">完整桌次名單</TabsTrigger>
              <TabsTrigger value="source">原圖對照</TabsTrigger>
            </TabsList>
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute top-2 left-2.5 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋賓客姓名"
                className="bg-white pl-8"
              />
            </div>
          </div>

          {hits.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 print:hidden">
              {hits.map((hit) => {
                const table = tableById(hit.tableId)
                return (
                  <Button
                    key={`${hit.tableId}-${hit.seat}`}
                    size="sm"
                    variant="outline"
                    onClick={() => handleSelect(hit.tableId)}
                  >
                    {table?.id === "head" ? "主桌" : `${table?.label} 桌`} · {hit.seat} 號 · {hit.name}
                  </Button>
                )
              })}
            </div>
          )}

          <div className="hidden print:block">
            <FloorPlan
              guests={guests}
              selectedId={null}
              matched={[]}
              onSelect={() => {}}
              idPrefix="print"
            />
          </div>

          <TabsContent value="map" className="print:hidden">
            <div className="mb-3 flex flex-wrap gap-1.5 print:hidden">
              {TABLE_ORDER.map((id) => {
                const table = tableById(id)
                if (!table) return null
                const active = selectedId === id
                return (
                  <Button
                    key={id}
                    size="sm"
                    variant={active ? "default" : "outline"}
                    onClick={() => handleSelect(id)}
                  >
                    {id === "head" ? "主桌" : `${table.label}桌`}
                  </Button>
                )
              })}
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="overflow-auto rounded-2xl border border-amber-200 bg-[#f6efe4] print:border-0">
                <FloorPlan
                  guests={guests}
                  selectedId={selectedId}
                  matched={hits}
                  onSelect={handleSelect}
                />
              </div>
              <aside className="space-y-4">
                <div className="hidden lg:block">
                  <SeatLegend />
                </div>
                {selected && (
                  <div className="rounded-xl border border-amber-200 bg-[#fffaf3] p-4">
                    <TableDetail
                      tableId={selected.id}
                      guests={guests[selected.id]}
                      onChange={(seat, name) => updateSeat(selected.id, seat, name)}
                    />
                  </div>
                )}
                {!selected && (
                  <p className="rounded-xl border border-dashed border-amber-200 bg-[#fffaf3] p-4 text-sm text-[#92400e]">
                    點選場中圓桌或上方桌號，即可查看該桌座位。
                  </p>
                )}
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="roster" className="print:hidden">
            <div className="mb-4 rounded-xl border border-amber-200 bg-[#fffaf3] p-4 text-sm leading-relaxed text-[#7c2d12]">
              場地與示意圖相同：左 11 桌、右 10 桌。新郎部屬 20 主位剛好兩桌：13 為 A Team、C、QA；14 為 B Team。Ben 廖宇軒另 1 位小朋友兒童座椅不佔主位。男方其餘：主桌、12 魏爺爺親友、15 江家長輩、16／17／19 楊家、18／20／21 江爸爸好友、22 備用。右側女方尚未排。
            </div>
            <RosterList
              guests={guests}
              onSelect={(id) => {
                handleSelect(id)
                setTab("map")
              }}
            />
          </TabsContent>

          <div className="print-break hidden print:block">
            <h2 className="mb-3 font-heading text-xl text-[#7c2d12]">完整桌次名單</h2>
            <RosterList guests={guests} onSelect={handleSelect} />
          </div>

          <TabsContent value="source">
            <div className="grid gap-4 md:grid-cols-2">
              <figure className="rounded-2xl border border-amber-200 bg-white p-3">
                <Image
                  src="/venue/ballroom-i.jpg"
                  alt="江林府 The Grand Ballroom I 原始場地圖"
                  className="h-auto w-full"
                  width={588}
                  height={808}
                />
                <figcaption className="mt-2 text-sm text-[#92400e]">
                  場地圖一：江林府 The Grand Ballroom I（本頁採用此桌位）
                </figcaption>
              </figure>
              <figure className="rounded-2xl border border-amber-200 bg-white p-3">
                <Image
                  src="/venue/ballroom-ii.jpg"
                  alt="The Grand Ballroom II 1號位紅點示意"
                  className="h-auto w-full"
                  width={432}
                  height={808}
                />
                <figcaption className="mt-2 text-sm text-[#92400e]">
                  場地圖二：紅點為每桌 1 號位，其餘順時針編號
                </figcaption>
              </figure>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
