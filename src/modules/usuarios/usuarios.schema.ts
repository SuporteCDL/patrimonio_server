import { z } from 'zod'

export const criarEsquemaUsuario = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'É necessário informar minimo de 6 caracteres'),
})

export type CriarEsquemaUsuario = z.infer<typeof criarEsquemaUsuario>