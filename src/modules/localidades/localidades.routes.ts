import { FastifyInstance } from "fastify";
import { createLocalidade, deleteLocalidade, getLocalidades, updateLocalidade } from "./localidades.controller";

export async function localidadesRoutes(app: FastifyInstance) {
  app.get('/', getLocalidades)

  app.post('/', createLocalidade)

  app.put('/', updateLocalidade)
  
  app.delete('/', deleteLocalidade)
}