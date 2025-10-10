import { FastifyInstance } from "fastify";
import { createSubGrupo, deleteSubGrupo, getSubGrupos, updateSubGrupo } from "./subgrupos.controller";

export async function subGruposRoutes(app: FastifyInstance) {
  app.get('/', getSubGrupos)

  app.post('/', createSubGrupo)
  
  app.put('/', updateSubGrupo)
  
  app.delete('/', deleteSubGrupo)
}