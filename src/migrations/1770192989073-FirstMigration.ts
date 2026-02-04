import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1770192989073 implements MigrationInterface {
    name = 'FirstMigration1770192989073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "text" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "title" TO "text"`);
    }

}
