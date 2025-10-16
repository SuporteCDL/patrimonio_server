import { FastifyReply, FastifyRequest } from "fastify";
import { esquemaCriacaoAtivo, AtivosQuerySchema, ativosQuerySchema } from "./ativos.schema";
import { ativoService } from "./ativos.service";

interface UpdateAtivoParam {
  id: number
}

// export async function getAtivos(request: FastifyRequest<{ Params: AtivosQuerySchema }>, reply: FastifyReply) {
//   const { codlocalidade, codcentrocusto, codsubgrupo, codmarca, codigo} = request.params
//   const ativos = await ativoService.listar(codlocalidade, codcentrocusto, codsubgrupo, codmarca, codigo)
//   return reply.send(ativos)
// }

export async function getAtivos(request: FastifyRequest, reply: FastifyReply) {
  const parseResult = ativosQuerySchema.safeParse(request.query)
  if (!parseResult.success) {
    return reply.status(400).send({ error: parseResult.error })
  }
  const { codlocalidade, codcentrocusto, codsubgrupo, codmarca, codigo } = parseResult.data
  const ativos = await ativoService.listar(
    codlocalidade,
    codcentrocusto,
    codsubgrupo,
    codmarca,
    codigo
  )
  return reply.send(ativos)
}

export async function createAtivo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaCriacaoAtivo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const novoAtivo = await ativoService.criar(parsed.data)
  return reply.code(201).send(novoAtivo)
}

export async function updateAtivo(request: FastifyRequest<{ Params: UpdateAtivoParam }>, reply: FastifyReply) {
  const { id } = request.params
  const parsed = esquemaCriacaoAtivo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const ativoAtualizado = await ativoService.alterar({
    id: Number(id),
    ...parsed.data
  })
  return reply.code(201).send(ativoAtualizado)
}

export async function deleteAtivo(request: FastifyRequest<{ Params: UpdateAtivoParam }>, reply: FastifyReply) {
  const { id } = request.params
  if (!id) {
    return reply.status(400).send({
      error: 'Erro de validação',
    })
  }
  await ativoService.excluir(id)
  return reply.code(201).send('Excluído com sucesso')
}