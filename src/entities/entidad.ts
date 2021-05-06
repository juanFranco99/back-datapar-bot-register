import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa";

@Entity({name: 'entidad'})
export class Entidad{
    @PrimaryGeneratedColumn({name: 'id_interno'})
    codigo: number;

    @Column({name: 'id'})
    codigo_dolphin: number;//codigo usuario dolphin

    @Column({name: 'telefono'})
    telefono: string;

    @ManyToOne(type => Empresa,{eager: true})
    @JoinColumn({name: 'empresa_id'})
    empresa: Empresa;

    @Column({name: 'nombre'})
    nombre: string;
    
    @Column({name: 'accountsid', nullable: true})
    accountId: string;

    @Column({name: 'padrao'})
    padron: boolean;    

}