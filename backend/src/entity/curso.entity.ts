import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TurmaEntity } from "./turma.entity";

@Entity({ name: "curso" })
export class CursoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  nome: string;

  @ManyToOne( type => TurmaEntity, {eager: true, nullable: false})
  turma: TurmaEntity
}
