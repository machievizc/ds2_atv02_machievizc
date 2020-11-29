import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CursoEntity } from "./curso.entity";

@Entity({ name: "faculdade" })
export class FaculdadeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  nome: string;

  @ManyToOne( type => CursoEntity, {eager: true, nullable: false})
  curso: CursoEntity
}
