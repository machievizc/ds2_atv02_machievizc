import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuario" })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  nome: string;

  @Column({ nullable: false, length: 30 })
  email: string;

  @Column({ nullable: false, length: 20 })
  registro: string;
}
