import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { Sidebar } from "./_components/side-bar"
import ModeToggle from "@/components/ui/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Relatórios de Ocorrência GAR",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="hidden md:flex md:w-64 md:flex-col">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-y-auto p-8">
            {children}
            <div className="absolute bottom-2 left-2">
              <ModeToggle />
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

