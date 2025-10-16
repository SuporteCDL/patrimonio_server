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

async function listar(
  codlocalidade: number,
  codcentrocusto?: number,
  codsubgrupo?: number,
  codmarca?: number,
  codigo?: string
) {
  // A consulta base
  const query = db('ativos')
    .join('localidades', 'ativos.codlocalidade', '=', 'localidades.id')
    .join('subgrupos', 'ativos.codsubgrupo', '=', 'subgrupos.id')
    .join('centro_custo', 'ativos.codcentrocusto', '=', 'centro_custo.id')
    .join('marcas', 'ativos.codmarca', '=', 'marcas.id')
    .select(
      'localidades.descricao as localidade',
      'subgrupos.descricao as subgrupo',
      'centro_custo.descricao as centrocusto',
      'marcas.descricao as marca',
      'ativos.*'
    )

  // Condição obrigatória
  query.where('ativos.codlocalidade', codlocalidade)

  // Condições opcionais
  if (codcentrocusto && codcentrocusto > 0) {
    query.andWhere('ativos.codcentrocusto', codcentrocusto)
  }

  if (codsubgrupo && codsubgrupo > 0) {
    query.andWhere('ativos.codsubgrupo', codsubgrupo)
  }

  if (codmarca && codmarca > 0) {
    query.andWhere('ativos.codmarca', codmarca)
  }

  if (codigo && codigo.trim() !== '') {
    query.andWhere('ativos.codigo', 'like', `%${codigo}%`)
  }

  // Executa a query
  return await query
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
