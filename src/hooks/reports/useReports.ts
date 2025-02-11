'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'

export type Report = {
  reportNumber: number
  title: string
  description: string
  createdAt: Date
  officersEnvolved: { id: string, fullName: string }[]
}

export type ReportsWithPagination = {
  data: Report[]
} & Pagination

type Pagination = {
  totalPages?: number
  totalCount?: number
}

interface UseReportsProps {
  currentPage?: number,
  itemsPerPage?: number,
  reportNumber?: string
  officerId?: string
}

export const useReports = ({ currentPage, itemsPerPage, reportNumber, officerId }: UseReportsProps) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<ReportsWithPagination>('/report', { params: { currentPage, itemsPerPage, reportNumber, officerId } })
      return res.data
    },

    queryKey: QUERY_KEYS.GET.REPORTS(currentPage, itemsPerPage, reportNumber, officerId),
  })
}
