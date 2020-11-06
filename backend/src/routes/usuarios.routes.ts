import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import CreateUsuarioService from '../services/CreateUsuarioService'
import verifySession from '../middlewares/verifySession'
import UpdateUsuarioAvatarService from '../services/UpdateUsuarioAvatarService'

const usuariosRouter = Router()
const upload = multer(uploadConfig)

usuariosRouter.post('/', async (request, response) => {
	const { name, email, password, passwordRepeat } = request.body

	const createUsuarioService = new CreateUsuarioService()

	const usuarioCreated = await createUsuarioService.execute({ name, email, password })

	return response.json(usuarioCreated)
})

usuariosRouter.patch('/avatar', verifySession, upload.single('avatar'), async (request, response) => {
	const updateUsuarioAvatarService = new UpdateUsuarioAvatarService()
	const usuario = await updateUsuarioAvatarService.execute({ user_id: request.user.id, avatarFileName: request.file.filename })
	return response.json(usuario)
})

export default usuariosRouter
