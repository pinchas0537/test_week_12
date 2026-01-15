import { IsAlpha, IsBoolean, IsInt, IsString } from "class-validator";

export class ProcurementDto{
    @IsString()
    declare id:string
    
    @IsString()
    name :string

    @IsString()
    type:string

    @IsInt()
    quantity:number

    @IsInt()
    pricePerUnit:number

    hasImage:boolean
}