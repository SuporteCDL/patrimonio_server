import { FastifyInstance } from 'fastify'
import { getUsers, createUser, updateUser, deleteUser } from './usuarios.controller'

export async function usuariosRoutes(app: FastifyInstance) {
  app.get('/', getUsers)

  app.post('/', createUser)

  app.put('/', updateUser)

  app.delete('/', deleteUser)
}
