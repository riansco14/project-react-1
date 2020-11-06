import { compare } from 'bcryptjs'
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import Usuario from '../models/Usuario'
import sessionConfig from '../config/session'
interface Request{
	email: string
	password: string
}
interface Response{
	usuario: Usuario
	token: string
}

class CreateSessionService {
	public async execute ({ email, password }: Request): Promise<Response> {
		const usuarioRepository = getRepository(Usuario)

		const usuarioFind = await usuarioRepository.findOne({ where: { email } })

		if (!usuarioFind) { throw new Error('Usuario não encontrado') }

		const checkPassword = await compare(password, usuarioFind.password)

		if (!checkPassword) { throw new Error('Senha Invalida') }

		// usuario autenticado
		// 1. colocar informações do usuario
		// 2. o segredo pra criptografar a senha
		// 3. --
		const { secret, expiresIn } = sessionConfig.jwt
		const token = sign({}, secret, {
			subject: usuarioFind.id,
			expiresIn: expiresIn
		})

		return {
			usuario: usuarioFind,
			token: token
		}
	}
}

export default CreateSessionService
