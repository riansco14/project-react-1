import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AlterProviderToProviderId1604604509821 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('agendamentos', 'provider')
		await queryRunner.addColumn('agendamentos', new TableColumn({
			name: 'provider_id',
			type: 'uuid',
			isNullable: true

		}))

		await queryRunner.createForeignKey('agendamentos', new TableForeignKey({
			name: 'AgendamentoProviderId',
			columnNames: ['provider_id'],
			referencedTableName: 'usuarios',
			referencedColumnNames: ['id'],
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE'
		}))
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('agendamentos', 'AgendamentoProviderId')
		await queryRunner.dropColumn('agendamentos', 'provider_id')
		await queryRunner.addColumn('agendamentos', new TableColumn({
			name: 'provider',
			type: 'varchar'
		}))
	}
}
