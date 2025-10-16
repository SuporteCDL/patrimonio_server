import Fastify from 'fastify'
import { registerRoutes } from './app/routes'
import cors from '@fastify/cors'

const app = Fastify({
  logger: true
})

app.register(cors, {
  origin: ['http://localhost:5173', 'http://192.168.2.106:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // <-- importante
})

app.register(registerRoutes)

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('🚀 Servidor rodando em http://192.168.2.106:3333')
})


