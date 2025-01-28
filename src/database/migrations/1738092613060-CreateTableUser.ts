import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class MedicamentoTable1738092613060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela medicamento
    await queryRunner.createTable(
      new Table({
        name: 'medicamento',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quantidade',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
        ],
      })
    );

    // Adicionar chave estrangeira para a tabela user
    await queryRunner.createForeignKey(
      'medicamento',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE', // Excluir medicamentos se o usuário for excluído
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a foreign key antes de deletar a tabela
    await queryRunner.dropForeignKey('medicamento', 'FK_medicamento_user');
    await queryRunner.dropTable('medicamento');
  }
}
