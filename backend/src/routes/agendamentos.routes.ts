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
	const { date, provider } = request.body
	const parsedDate = parseISO(date)

	const createAgendamentoService = new CreateAgendamentoService()

	const agendamento = await createAgendamentoService.execute({ date: parsedDate, provider })

	return response.json(agendamento)
})

export default agendamentosRouter
