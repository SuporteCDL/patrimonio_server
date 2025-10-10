import { FastifyReply, FastifyRequest } from "fastify";
import { esquemaCriacaoCentroCusto, esquemaAlteracaoCentroCusto } from "./centrocusto.schema";
import { centroCustoService } from "./centrocusto.service";

export async function getCentroCusto(request: FastifyRequest, reply: FastifyReply) {
  const centroCusto = await centroCustoService.listar()
  return reply.send(centroCusto)
}

export async function createCentroCusto(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaCriacaoCentroCusto.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const novoCentroCusto = await centroCustoService.criar(parsed.data)
  return reply.code(201).send(novoCentroCusto)
}

export async function updateCentroCusto(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoCentroCusto.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const centroCustoAtualizado = await centroCustoService.alterar(parsed.data)
  return reply.code(201).send(centroCustoAtualizado)
}

export async function deleteCentroCusto(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoCentroCusto.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  await centroCustoService.excluir(parsed.data.id)
  return reply.code(201).send('Excluído com sucesso')
}