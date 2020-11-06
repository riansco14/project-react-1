import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'

import CreateUsuarioService from '../services/CreateUsuarioService'
import verifySession from '../middlewares/verifySession'

const usuariosRouter = Router()
const upload = multer(uploadConfig)

usuariosRouter.post('/', async (request, response) => {
	try {
		const { name, email, password, passwordRepeat } = request.body

		const createUsuarioService = new CreateUsuarioService()

		const usuarioCreated = await createUsuarioService.execute({ name, email, password })

		return response.json(usuarioCreated)
	} catch (error) {
		return response.status(400).json({ error: error.message })
	}
})

usuariosRouter.patch('/avatar', verifySession, upload.single('avatar'), async (request, response) => {
	try {
		return response.json({ ok: true })
	} catch (error) {
		return response.status(400).json({ error: error.message })
	}
})

export default usuariosRouter
