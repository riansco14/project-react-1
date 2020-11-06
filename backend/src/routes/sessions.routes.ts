import { Router } from 'express'
import CreateSessionService from '../services/CreateSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body
		const createSessionService = new CreateSessionService()

		const { usuario, token } = await createSessionService.execute({ email, password })

		return response.json({ usuario, token })
	} catch (error) {
		return response.status(400).json({ error: error.message })
	}
})

export default sessionsRouter
