import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
  return 'Pong!'
})

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
