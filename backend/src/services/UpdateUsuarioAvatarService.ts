import { getRepository } from 'typeorm'
import Usuario from '../models/Usuario'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'

interface Request{
	user_id: string
	avatarFileName: string
}
class UpdateUsuarioAvatarService {
	public async execute ({ user_id, avatarFileName }: Request): Promise<Usuario> {
		const usuarioRepository = getRepository(Usuario)

		const usuarioFind = await usuarioRepository.findOne(user_id)

		if (!usuarioFind) { throw new Error('Usuario Invalido, apenas usuarios autenticados') }

		if (usuarioFind.avatar) {
			const usuarioAvatarFilePath = path.join(uploadConfig.directory, usuarioFind.avatar)

			try {
				const userAvatarFileExists = await fs.promises.stat(usuarioAvatarFilePath)

				if (userAvatarFileExists) {
					await fs.promises.unlink(usuarioAvatarFilePath)
				}
			} catch (error) {
			}
		}

		usuarioFind.avatar = avatarFileName

		await usuarioRepository.save(usuarioFind)

		return usuarioFind
	}
}

export default UpdateUsuarioAvatarService
