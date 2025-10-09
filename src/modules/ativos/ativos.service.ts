import { db } from "../../database/knex";

interface IAtivo {
  id: number
  codigo: string
  status: string
  descricao: string
  aquisicao: string
  valor_aquisicao: string
  valor_atual: string
  depreciacao: string
  codsubgrupo: number
  codcentrocusto: number
  codmarca: number
}

async function listar() {
  return await db('ativos').select('*')
}

async function criar(dados: Omit<IAtivo, 'id'>) {
  const [ativo] = await db('ativos').insert({
    codigo: dados.codigo,
    status: dados.status,
    descricao: dados.descricao,
    aquisicao: dados.aquisicao,
    valor_aquisicao: dados.valor_aquisicao,
    valor_atual: dados.valor_atual,
    depreciacao: dados.depreciacao,
    codsubgrupo: dados.codsubgrupo,
    codcentrocusto: dados.codcentrocusto,
    codmarca: dados.codmarca
  })
  .returning('*')
  return ativo
}

async function alterar(dados: IAtivo) {
  const [ativo] = await db('ativos')
  .where({ id: Number(dados.id)})
  .update({
    codigo: dados.codigo,
    status: dados.status,
    descricao: dados.descricao,
    aquisicao: dados.aquisicao,
    valor_aquisicao: dados.valor_aquisicao,
    valor_atual: dados.valor_atual,
    depreciacao: dados.depreciacao,
    codsubgrupo: dados.codsubgrupo,
    codcentrocusto: dados.codcentrocusto,
    codmarca: dados.codmarca
  })
  .returning('*')
  return ativo
}

async function excluir(id: Number) {
  await db('grupos')
  .where({ id: id})
  .delete()
  return 
}

export const ativoService = { listar, criar, alterar, excluir }