import { FastifyInstance } from 'fastify'
import { usuariosRoutes } from '../modules/usuarios/uruarios.routes'
import { gruposRoutes } from '../modules/grupos/grupos.routes'

export async function registerRoutes(app: FastifyInstance) {
  app.register(usuariosRoutes, { prefix: '/usuarios' })
  app.register(gruposRoutes, { prefix: '/grupos' })

}