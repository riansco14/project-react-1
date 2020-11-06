import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'

import Appointment from '../models/Agendamento'
import AppointmentRepository from '../repositories/AgendamentosRepository'

interface Request{
	date: Date
	provider: string
}

class CreateAgendamentoService {
	public async execute ({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentRepository)
		const appointmentDate = startOfHour(date)

		const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate)

		if (findAppointmentInSameDate) {
			throw new AppError('Esse agendamento já foi realizado nesse horário')
		}

		const appointment = appointmentRepository.create({ provider_id, date: appointmentDate })

		await appointmentRepository.save(appointment)

		return appointment
	}
}

export default CreateAgendamentoService
