import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'empresa'})
export class Empresa{
    @PrimaryGeneratedColumn({name: 'id'})
    codigo: number;

    @Column({name: 'nome'})
    nombre: string;

    @Column()
    habilitado: boolean;
}