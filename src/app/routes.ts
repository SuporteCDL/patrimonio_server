import { FastifyInstance } from 'fastify'
import { usuariosRoutes } from '../modules/usuarios/uruarios.routes'

export async function registerRoutes(app: FastifyInstance) {
  // Rotas de usuários
  app.register(usuariosRoutes, { prefix: '/usuarios' })

  // Caso tenha outros módulos, registre aqui também:
  // app.register(productsRoutes, { prefix: '/products' })
}