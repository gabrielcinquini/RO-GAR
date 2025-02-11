"use client"

import { Report } from "@/hooks"
import { Pagination } from "../../_components"
import { ReportCard } from "./report-card"

type ReportListProps = {
  reports?: Report[]
  currentPage: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  totalPages?: number
  totalCount?: number
}

export default function ReportList({ reports, currentPage, onPageChange, itemsPerPage, totalPages, totalCount }: ReportListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {reports?.map((report) => (
          <ReportCard key={report.reportNumber} report={report} />
        ))}
        {reports?.length === 0 && <p className="text-center text-gray-500">Nenhum R.O encontrado!</p>}
      </div>
      <Pagination
        lastPage={totalPages}
        currentPage={currentPage}
        siblingsCount={1}
        onPageChange={(page) => onPageChange(page)}
        pageSize={itemsPerPage}
        totalCount={totalCount}
      />
    </div>
  )
}
