import { hash, compare } from 'bcrypt'
import { db } from "../../database/knex" 

interface IUsuario {
  id: number
  nome: string
  email: string
  password: string
}

async function listar() {
  return await db('usuarios').select('*').orderBy('nome')
}

async function logar(dados: Omit<IUsuario, 'id'>) {
  const [usuario] = await db('usuarios')
  .select()
  .where('email', dados.email)
  .returning('*')
  const isAuthenticate = await compare(dados.password, usuario.password)
  if (isAuthenticate) {
    return usuario
  } else {
    return null
  }
}

async function criar(dados: Omit<IUsuario, 'id'>) {
  const [usuario] = await db('usuarios')
    .insert({
      nome: dados.nome,
      email: dados.email,
      password: dados.password,
    })
    .returning('*')

  return usuario
}

async function alterar(dados: IUsuario) {
  const [usuario] = await db('usuarios')
    .where({ id: Number(dados.id) })
    .update({
      nome: dados.nome,
      email: dados.email,
    })
    .returning('*')

  return usuario
}

async function excluir(id: Number) {
  const [usuario] = await db('usuarios')
    .where({ id: id })
    .delete()
    .returning('*')

  return usuario
}

export const usuarioService = { listar, logar, criar, alterar, excluir }