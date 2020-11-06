import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import Usuario from '../models/Usuario'

interface Request{
	name: string
	email: string
	password: string
}

class CreateUsuarioService {
	public async execute ({ name, email, password }: Request): Promise<Usuario> {
		const usuarioRepository = getRepository(Usuario)
		const usuarioFind = await usuarioRepository.findOne({ where: { email } })

		if (usuarioFind) {
			throw new Error('Usuário já existe ')
		}

		// Hash da senha
		const passwordHash = await hash(password, 8)

		const usuarioCreate = await usuarioRepository.create({
			name,
			email,
			password: passwordHash
		})

		await usuarioRepository.save(usuarioCreate)

		delete usuarioCreate.password

		return usuarioCreate || null
	}
}

export default CreateUsuarioService
