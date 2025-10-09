import z from "zod";

export const esquemaCriacaoAtivo = z.object({
  codigo: z.string().min(1, 'Favor informar no mínimo 1 caracter'),
  status: z.string().min(3, 'Informe pelo menos 3 caracteres do Status'),
  descricao: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  aquisicao: z.string(),
  valor_aquisicao: z.string(),
  valor_atual: z.string(),
  depreciacao: z.string(),
  codsubgrupo: z.number(),
  codcentrocusto: z.number(),
  codmarca: z.number(),
})

export const esquemaAlteracaoAtivo = esquemaCriacaoAtivo.extend({
  id: z.number().int().positive({ message : 'ID inválido' }),
})

export const esquemaAtivo = esquemaCriacaoAtivo.extend({
  id: z.number(),
})

export type EsquemaCriacaoAtivo = z.infer<typeof esquemaCriacaoAtivo>
export type EsquemaAlteracaoAtivo = z.infer<typeof esquemaAlteracaoAtivo>
export type EsquemaAtivo = z.infer<typeof esquemaAtivo>
