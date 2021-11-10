import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'CFGUSUA'})
export class UsuarioDolphin{
    @PrimaryColumn({name: 'NCODIUSUA'})
    codigo: number;

    @Column({name: 'CNOMEUSUA'})
    nombreUsuario: string;

}