import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { registerRoutes } from './app/routes'

const app = Fastify({
  logger: true
})

app.register(registerRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Servidor rodando em http://localhost:3333')
})

