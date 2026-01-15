import { AutoIncrement, Column, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table({timestamps: false})
export class Procurement extends Model{
    @PrimaryKey
    @Column
    declare id: string

    // @NotNull
    @Column
    name: string

    // @NotNull
    @Column
    type:string

    // @NotNull
    @Column
    quantity:number

    // @NotNull
    @Column
    pricePerUnit:number

    // @NotNull
    @Column
    hasImage:boolean
} 