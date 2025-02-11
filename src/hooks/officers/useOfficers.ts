import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { PilotRank } from '@/shared/types'

export type Officer = {
  id: string
  fullName: string
  phone: string
  internalRole: PilotRank
  lastReport: {
    reportNumber: number
    title: string
    createdAt: Date
  } | null
  createdAt: Date
}

export type OfficersWithPagination = {
  data: Officer[]
} & Pagination

type Pagination = {
  totalPages?: number
  totalCount?: number
}

type UseReportsProps = {
  currentPage?: number
  itemsPerPage?: number
}

export const useOfficers = ({ currentPage, itemsPerPage }: UseReportsProps) => {
  return useQuery({
    queryFn: async () => {
      const res = await api.get<OfficersWithPagination>('/officer', { params: { currentPage, itemsPerPage } })
      return res.data
    },

    queryKey: QUERY_KEYS.GET.OFFICERS(currentPage, itemsPerPage),
  })
}
