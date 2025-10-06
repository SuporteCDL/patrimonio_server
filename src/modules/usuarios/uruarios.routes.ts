import { FastifyInstance } from 'fastify'
import { getUsers, createUser } from './usuarios.controller'
import { criarEsquemaUsuario } from './usuarios.schema'

export async function usuariosRoutes(app: FastifyInstance) {
  app.get('/', getUsers)

  app.post('/', {
    schema: { body: criarEsquemaUsuario },
    handler: createUser,
  })
}