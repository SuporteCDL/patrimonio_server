import Fastify from 'fastify'
import { registerRoutes } from './app/routes'
import cors from '@fastify/cors'

const app = Fastify({
  logger: true
})

app.register(cors, {
  origin: true,
})
app.register(registerRoutes)

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('🚀 Servidor rodando em http://192.168.2.106:3333')
})

