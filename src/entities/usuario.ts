import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'usuario'})
export class Usuario{
    @PrimaryColumn()
    username: number;

    @Column({name: 'nome'})
    nombre: string;

    @Column()
    email: string;

    @Column({name: 'senha'})
    password: string;

    @Column()
    estado: string;
}