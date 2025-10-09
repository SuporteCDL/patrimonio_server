import { FastifyReply, FastifyRequest } from "fastify";
import { esquemaCriacaoAtivo, esquemaAlteracaoAtivo } from "./ativos.schema";
import { ativoService } from "./ativos.service";

export async function getAtivos(request: FastifyRequest, reply: FastifyReply) {
  const ativos = await ativoService.listar()
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

export async function updateAtivo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoAtivo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const ativoAtualizado = await ativoService.alterar(parsed.data)
  return reply.code(201).send(ativoAtualizado)
}

export async function deleteAtivo(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoAtivo.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  await ativoService.excluir(parsed.data.id)
  return reply.code(201).send('Excluído com sucesso')
}