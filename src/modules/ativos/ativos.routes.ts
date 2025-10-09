import { FastifyInstance } from "fastify"
import { createAtivo, deleteAtivo, getAtivos, updateAtivo } from "./ativos.controller"

export async function ativosRoutes(app: FastifyInstance) {
  app.get('/', getAtivos)

  app.post('/', createAtivo)

  app.put('/', updateAtivo)
  
  app.delete('/', deleteAtivo)
}