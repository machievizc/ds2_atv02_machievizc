import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: "turma" })
export class TurmaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne( type => UsuarioEntity, {eager: true, nullable: false})
  usuario: UsuarioEntity
}
