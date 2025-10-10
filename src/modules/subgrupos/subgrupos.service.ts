import { db } from "../../database/knex";

interface ISubGrupo {
  id: number
  codgrupo: number
  descricao: string
}

async function listar() {
  return await db('subgrupos').select('*')
}

async function criar(dados: Omit<ISubGrupo, 'id'>) {
  const [subGrupo] = await db('subGrupos').insert({
    codgrupo: dados.codgrupo,
    descricao: dados.descricao,
  })
  .returning('*')
  return subGrupo
}

async function alterar(dados: ISubGrupo) {
  const [subGrupo] = await db('subGrupos')
  .where({ id: Number(dados.id)})
  .update({
    codgrupo: dados.codgrupo,
    descricao: dados.descricao,
  })
  .returning('*')
  return subGrupo
}

async function excluir(id: Number) {
  await db('subGrupos')
  .where({ id: id})
  .delete()
  return 
}

export const subGrupoService = { listar, criar, alterar, excluir }