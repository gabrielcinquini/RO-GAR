'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { revalidateQueryKey } from '@/utils/utils'
import { Session } from 'next-auth'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useDeleteOfficer = (authorization: Session | null) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (officerPhoneNumber: string) => {
      return await api.delete(`/officer/${officerPhoneNumber}`, {
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
