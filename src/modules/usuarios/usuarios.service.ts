import { db } from "../../database/knex" 

interface CriarUsuario {
  nome: string
  email: string
  password: string
}

async function listar() {
  return await db('usuarios').select('*')
}

async function criar(dados: CriarUsuario) {
  const [usuario] = await db('usuarios')
    .insert({
      nome: dados.nome,
      email: dados.email,
      password: dados.password,
    })
    .returning('*')

  return usuario
}

export const usuarioService = { listar, criar }