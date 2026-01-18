import { AutoIncrement, Column, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table({timestamps: false})
export class Procurement extends Model{
    @PrimaryKey
    @Column
    declare id: string

    @Column
    name: string

    @Column
    type:string

    @Column
    quantity:number

    @Column
    pricePerUnit:number

    @Column
    hasImage:boolean
} 