import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: false, nullable: false })
  title!: string;

  @Column({ type: "boolean", default: false, nullable: false })
  isCompleted!: boolean;
}
