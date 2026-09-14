"use client"

import { useCallback, useSyncExternalStore } from "react"

import { defaultGuests } from "@/data/guests"
import { emptyGuests, TABLE_ORDER, tableById, TABLES } from "@/data/venue"

const STORAGE_KEY = "awu-wedding-seating-v16"
const listeners = new Set<() => void>()
const defaultSnapshot = defaultGuests()
let memory: GuestMap | null = null

export type GuestMap = Record<string, string[]>

export function normalizeGuests(raw: unknown): GuestMap {
  const base = emptyGuests()
  if (!raw || typeof raw !== "object") return base
  const incoming = raw as Record<string, unknown>
  for (const table of TABLES) {
    const value = incoming[table.id]
    if (Array.isArray(value)) {
      base[table.id] = Array.from({ length: table.seats }, (_, i) =>
        String(value[i] ?? "").trim()
      )
    }
  }
  return base
}

function readStorage(): GuestMap {
  if (typeof window === "undefined") return defaultSnapshot
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? normalizeGuests(JSON.parse(saved)) : defaultGuests()
  } catch {
    return defaultGuests()
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

export function loadGuests(): GuestMap {
  if (!memory) memory = readStorage()
  return memory
}

export function saveGuests(guests: GuestMap) {
  memory = guests
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guests))
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useGuests() {
  const guests = useSyncExternalStore(subscribe, loadGuests, () => defaultSnapshot)
  const setGuests = useCallback((updater: GuestMap | ((prev: GuestMap) => GuestMap)) => {
    const current = loadGuests()
    const next = typeof updater === "function" ? updater(current) : updater
    saveGuests(next)
  }, [])
  return [guests, setGuests] as const
}

export function occupiedCount(guests: GuestMap) {
  return TABLE_ORDER.reduce(
    (sum, id) => sum + guests[id].filter((name) => name.length > 0).length,
    0
  )
}

export function searchSeats(guests: GuestMap, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return [] as { tableId: string; seat: number; name: string }[]
  const hits: { tableId: string; seat: number; name: string }[] = []
  for (const id of TABLE_ORDER) {
    guests[id].forEach((name, index) => {
      if (name && name.toLowerCase().includes(q)) {
        hits.push({ tableId: id, seat: index + 1, name })
      }
    })
  }
  return hits
}

export function downloadJson(guests: GuestMap) {
  const blob = new Blob([JSON.stringify({ guests }, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "awu-wedding-seating.json"
  a.click()
  URL.revokeObjectURL(url)
}

export function guestsFromText(text: string): GuestMap | null {
  try {
    const parsed = JSON.parse(text)
    if (parsed.guests) return normalizeGuests(parsed.guests)
    return normalizeGuests(parsed)
  } catch {
    return parsePlainList(text)
  }
}

function parsePlainList(text: string): GuestMap | null {
  const guests = emptyGuests()
  let current: string | null = null
  let assigned = 0
  const lines = text.split(/\r?\n/)
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    const tableMatch = line.match(/^(主桌|第?\s*(\d+)\s*桌)/)
    if (tableMatch) {
      current = tableMatch[1] === "主桌" ? "head" : String(Number(tableMatch[2]))
      if (current !== "head" && !guests[current]) current = null
      continue
    }
    if (!current) continue
    const table = tableById(current)
    const seats = table?.seats ?? guests[current].length
    const seatMatch = line.match(/^(\d+)\s*[號号位.\-、:：]?\s*(.*)$/)
    if (seatMatch) {
      const seat = Number(seatMatch[1])
      if (seat >= 1 && seat <= seats) {
        guests[current][seat - 1] = seatMatch[2].trim()
        assigned += 1
      }
      continue
    }
    const emptyIndex = guests[current].findIndex((name) => !name)
    if (emptyIndex >= 0) {
      guests[current][emptyIndex] = line.replace(/^[\-•●]\s*/, "")
      assigned += 1
    }
  }
  return assigned > 0 ? guests : null
}
