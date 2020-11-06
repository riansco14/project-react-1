import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Usuario from './Usuario'

@Entity('agendamentos')
class Agendamento {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	provider_id: string

	@ManyToOne(() => Usuario)
	@JoinColumn({ name: 'provider_id' })
	provider: Usuario

	@Column('timestamp with time zone')
	date: Date

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}

export default Agendamento
