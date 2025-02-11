"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { OfficersList } from "./_components"
import { OfficerModal } from "./_components/officer-modal"

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Membros</h1>
        <OfficerModal>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Oficial
          </Button>
        </OfficerModal>
      </div>
      <OfficersList />
    </div>
  )
}

