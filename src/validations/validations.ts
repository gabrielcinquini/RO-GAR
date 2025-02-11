import { PilotRank } from '@/shared/types'
import { z } from 'zod'

export const signInForm = z.object({
  phone: z.string().regex(/^\d{3}-\d{3}$/, 'Formato inválido(123-456)'),
  password: z.string().min(4, 'Mínimo de 4 caracteres'),
})
export type SignInFormType = z.infer<typeof signInForm>

export const signUpForm = z
  .object({
    firstName: z
      .string()
      .regex(/^[A-ZÁÉÍÓÚÃÕÂÊÎÔÇ][a-záéíóúãõâêîôç]+$/, 'Nome inválido (Joe)'),
    lastName: z
      .string()
      .regex(/^[A-ZÁÉÍÓÚÃÕÂÊÎÔÇ][a-záéíóúãõâêîôç]+$/, 'Nome inválido (Joe)'),
    phone: z.string().regex(/^\d{3}-\d{3}$/, 'Formato inválido (123-456)'),
    internalRole: z.nativeEnum(PilotRank),
    password: z
      .string()
      .min(4, 'Mínimo de 4 caracteres')
      .optional(),
    confirmPassword: z
      .string()
      .min(4, 'Mínimo de 4 caracteres')
      .optional()
      .or(z.literal('')), // Permite string vazia
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }
  )
  .transform(({ ...data }) => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`,
  }));

export type SignUpFormType = z.infer<typeof signUpForm>

export const reportForm = z.object({
  reportNumber: z.coerce.number().int().positive('O número do relatório deve ser positivo'),
  title: z.string().min(4, 'Mínimo de 4 caracteres'),
  description: z.string().min(4, 'Mínimo de 4 caracteres'),
  selectInvolvedOfficer: z.string().optional(),
  officersEnvolved: z.array(z.object({
    id: z.string(),
    fullName: z.string(),
  }))
})
export type ReportFormType = z.infer<typeof reportForm>

export const filterReportSchema = z.object({
  reportNumber: z.string().optional(),
  officerId: z.union([z.string(), z.literal('all')]).optional(),
})

export type FilterReportType = z.infer<typeof filterReportSchema>