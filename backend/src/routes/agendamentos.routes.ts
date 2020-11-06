import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import AgendamentosRepository from '../repositories/AgendamentosRepository'
import CreateAgendamentoService from '../services/CreateAgendamentoService'
import verifySession from '../middlewares/verifySession'

const agendamentosRouter = Router()

// Só pode usar a rota se for autenticado
agendamentosRouter.use(verifySession)

agendamentosRouter.get('/', async (request, response) => {
	const agendamentosRepository = getCustomRepository(AgendamentosRepository)
	const agendamentos = await agendamentosRepository.find()

	return response.json(agendamentos)
})

agendamentosRouter.post('/', async (request, response) => {
	try {
		const { date, provider } = request.body
		const parsedDate = parseISO(date)

		const createAgendamentoService = new CreateAgendamentoService()

		const agendamento = await createAgendamentoService.execute({ date: parsedDate, provider })

		return response.json(agendamento)
	} catch (error) {
		return response.status(400).json({ error: error.message })
	}
})

export default agendamentosRouter
