import { FastifyReply, FastifyRequest } from 'fastify'
import { usuarioService } from './usuarios.service'
import { esquemaCriacaoUsuario, esquemaAlteracaoUsuario } from './usuarios.schema'

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  const usuarios = await usuarioService.listar()
  return reply.send(usuarios)
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaCriacaoUsuario.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const novoUsuario = await usuarioService.criar(parsed.data)
  return reply.code(201).send(novoUsuario)
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoUsuario.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const usuarioAtualizado = await usuarioService.alterar(parsed.data)
  return reply.code(201).send(usuarioAtualizado)
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const parsed = esquemaAlteracaoUsuario.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  await usuarioService.excluir(parsed.data.id)
  return reply.code(201).send('Excluído com sucesso')
}