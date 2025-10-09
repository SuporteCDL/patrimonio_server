import { FastifyReply, FastifyRequest } from "fastify";
import { esquemaCriacaoLocalidade, esquemaAlteracaoLocalidade } from "./localidades.schema";
import { localidadeService } from "./localidades.service";

export async function getLocalidades(request: FastifyRequest, reply: FastifyReply) {
  const localidades = await localidadeService.listar()
  return reply.send(localidades)
}

export async function createLocalidade(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaCriacaoLocalidade.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const novaLocalidade = await localidadeService.criar(parsed.data)
  return reply.code(201).send(novaLocalidade)
}

export async function updateLocalidade(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoLocalidade.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const localidadeAtualizada = await localidadeService.alterar(parsed.data)
  return reply.code(201).send(localidadeAtualizada)
}

export async function deleteLocalidade(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoLocalidade.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  await localidadeService.excluir(parsed.data.id)
  return reply.code(201).send('Excluída com sucesso')
}