import { FastifyReply, FastifyRequest } from 'fastify'
import { usuarioService } from './usuarios.service'
import { esquemaCriacaoUsuario, esquemaAlteracaoUsuario } from './usuarios.schema'
import { hash, compare } from 'bcrypt'
import { randomInt } from 'crypto'

interface UpdateUsuarioParam {
  id: number
}

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
  const randomSalt = randomInt(10, 16)
  const passwordHash = await hash(String(parsed.data.password), randomSalt)
  const dadosUsuario = {
    nome: parsed.data.nome,
    email: parsed.data.email,
    password: passwordHash
  }
  const novoUsuario = await usuarioService.criar(dadosUsuario)
  return reply.code(201).send(novoUsuario)
}

export async function updateUser(request: FastifyRequest<{ Params: UpdateUsuarioParam }>, reply: FastifyReply) {
  const { id } = request.params
  const parsed = esquemaCriacaoUsuario.safeParse(request.body)
  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Erro de validação',
      details: parsed.error.format(),
    })
  }
  const usuarioAtualizado = await usuarioService.alterar({
    id: Number(id),
    ...parsed.data
  })
  return reply.code(201).send(usuarioAtualizado)
}

export async function deleteUser(request: FastifyRequest<{ Params: UpdateUsuarioParam }>, reply: FastifyReply) {
  const { id } = request.params
  if (!id) {
    return reply.status(400).send({
      error: 'Erro de validação',
    })
  }
  await usuarioService.excluir(id)
  return reply.code(201).send('Excluído com sucesso')
}