import { FastifyReply, FastifyRequest } from "fastify";
import { esquemaCriacaoSubGrupo, esquemaAlteracaoSubGrupo } from "./subgrupos.schema";
import { subGrupoService } from "./subgrupos.service";

export async function getSubGrupos(request: FastifyRequest, reply: FastifyReply) {
  const subGrupos = await subGrupoService.listar()
  return reply.send(subGrupos)
}

export async function createSubGrupo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaCriacaoSubGrupo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const novoSubGrupo = await subGrupoService.criar(parsed.data)
  return reply.code(201).send(novoSubGrupo)
}

export async function updateSubGrupo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoSubGrupo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const subGrupoAtualizado = await subGrupoService.alterar(parsed.data)
  return reply.code(201).send(subGrupoAtualizado)
}

export async function deleteSubGrupo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoSubGrupo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  await subGrupoService.excluir(parsed.data.id)
  return reply.code(201).send('Excluído com sucesso')
}