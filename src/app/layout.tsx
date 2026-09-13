import type { Metadata } from "next"
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google"

import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

const sans = Noto_Sans_TC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const serif = Noto_Serif_TC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  title: "阿武喜宴場地桌次｜江林府 Grand Ballroom I",
  description: "1004 江林府喜宴完整場地桌次圖。1 號位為近舞台左上紅點，其餘順時針排列。",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f6efe4] font-sans text-[#3f2a1d]">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
