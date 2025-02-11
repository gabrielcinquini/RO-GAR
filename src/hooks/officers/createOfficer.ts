'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { revalidateQueryKey } from '@/utils/utils'
import { Session } from 'next-auth'
import { api } from '@/lib/api'
import { ReportFormType, SignUpFormType } from '@/validations'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useCreateOfficer = (authorization: Session | null) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (officer: SignUpFormType) => {
      return await api.post('/officer', officer, {
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
      console.log(err)
      if(err instanceof AxiosError) toast.error(err.response?.data.message)
    },
  })
}
