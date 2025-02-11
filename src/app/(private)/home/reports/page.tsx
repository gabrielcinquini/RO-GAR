"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import FilterForm from "./_components/filter-form"
import { ReportModal } from "./_components/report-modal"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios de Ocorrência</h1>
        <ReportModal>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo R.O
          </Button>
        </ReportModal>
      </div>
      <FilterForm />
    </div>
  )
}

