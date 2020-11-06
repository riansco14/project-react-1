import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddAvatarFieldInUsuario1604617320837 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('usuarios', new TableColumn({
			name: 'avatar',
			type: 'varchar',
			isNullable: true
		}))
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('usuarios', 'avatar')
	}
}
