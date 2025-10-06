import { FastifyReply, FastifyRequest } from 'fastify'
import { usuarioService } from './usuarios.service'
import { criarEsquemaUsuario } from './usuarios.schema'

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await usuarioService.listar()
  return reply.send(users)
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const dados = criarEsquemaUsuario.parse(request.body)
  const novoUsuario = await usuarioService.criar(dados)
  return reply.code(201).send(novoUsuario)
}