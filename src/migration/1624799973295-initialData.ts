import { MigrationInterface, QueryRunner } from "typeorm";

export class initialData1624799973295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into fixed(name,isChecked) values("bat",0),("cmd",1),("com",1),("cpl",1),("exe",1),("scr",1),("js",1)`
    );
    await queryRunner.query(
      `insert into custom(name) values("sh"),("ju"),("ch")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
