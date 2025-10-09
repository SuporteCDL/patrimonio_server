import { FastifyReply, FastifyRequest } from "fastify";
import { esquemaCriacaoGrupo, esquemaAlteracaoGrupo } from "./grupos.schema";
import { grupoService } from "./grupos.service";

export async function getGrupos(request: FastifyRequest, reply: FastifyReply) {
  const grupos = await grupoService.listar()
  return reply.send(grupos)
}

export async function createGrupo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaCriacaoGrupo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const novoGrupo = await grupoService.criar(parsed.data)
  return reply.code(201).send(novoGrupo)
}

export async function updateGrupo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoGrupo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const grupoAtualizado = await grupoService.alterar(parsed.data)
  return reply.code(201).send(grupoAtualizado)
}

export async function deleteGrupo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoGrupo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  await grupoService.excluir(parsed.data.id)
  return reply.code(201).send('Excluído com sucesso')
}