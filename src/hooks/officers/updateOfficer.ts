'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { revalidateQueryKey } from '@/utils/utils'
import { Session } from 'next-auth'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { Officer } from './useOfficers'
import { User } from '@/shared/types'

export const useUpdateOfficer = (authorization: Session | null) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ currentOfficerPhone, officer }: { currentOfficerPhone?: string, officer: Omit<User, 'id'> }) => {
      return await api.patch(`/officer/${currentOfficerPhone}`, officer, {
        headers: {
          Authorization: `Bearer ${authorization?.token}`,
        }
      })
    },
    onSuccess: (data) => {
      toast.success(data.data.message)
      revalidateQueryKey(QUERY_KEYS.MUTATE.OFFICERS(), queryClient)
    },
    onError: (err) => {
      console.error(err)
      if(err instanceof AxiosError) toast.error(err.response?.data.message)
    },
  })
}
