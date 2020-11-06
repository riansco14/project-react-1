import { EntityRepository, Repository } from 'typeorm'

import Agendamento from '../models/Agendamento'

@EntityRepository(Agendamento)
class AgendamentosRepository extends Repository<Agendamento> {
	public async findByDate (date: Date): Promise<Agendamento | null> {
		const findAppoiment = await this.findOne({ where: { date: date } })

		return findAppoiment || null
	}
}

export default AgendamentosRepository
