import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'empresa'})
export class Empresa {
    @PrimaryColumn({name: 'id', unique: true})
    codigo: number;

    @Column({name: 'nome'})
    nombre: string;

    @Column({default: false})
    habilitado: boolean;
}