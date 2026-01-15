import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Procurement } from './procurement.entity.js';
import fs from "fs/promises"
import { ProcurementDto } from './valid-procurement.dto.js';
import { Optional } from 'sequelize';

@Injectable()
export class ProcurementService {
    constructor(
        @InjectModel(Procurement)
        private procurementModel: typeof Procurement,) { }
    async buying(procurementDto: ProcurementDto): Promise<object> {
        try {
            const buying: ProcurementDto = {
                id: procurementDto.id,
                name: procurementDto.name,
                type: procurementDto.type,
                quantity: procurementDto.quantity,
                pricePerUnit: procurementDto.pricePerUnit,
                hasImage: false
            }
            const cost = buying.quantity * buying.pricePerUnit
            const json = await this.readfile()
            if ((json[0].currentBudget - cost) <= 0) { return { message: "There is not enough money for this purchase." } }
            await this.writefile(json,cost)
            const exists = await this.procurementModel.findByPk(buying.id)
            if (exists) {
                const newQuantity = exists.dataValues.quantity + buying.quantity
                await this.procurementModel.update({ quantity: newQuantity }, { where: { id: buying.id } })
                return {
                    results: [
                        { id: buying.id, newQuantity: newQuantity, spent: cost }
                    ]
                }
            }
            const add = await this.procurementModel.create(buying as unknown as Optional<any, string>)
            return {
                results: [
                    { id: add.dataValues.id, newQuantity: add.dataValues.quantity, spent: cost }
                ]
            }
        } catch (error) {
            throw error
        }
    }
    async readfile() {
        const read = await fs.readFile('src/procurement/budget.json', "utf-8")
        const json = JSON.parse(read)
        return json
    }
    async writefile(json: any, cost: number) {
        const sub = json[0].currentBudget - cost
        const tostring = JSON.stringify([{ "currentBudget": sub }])
        const write = await fs.writeFile('src/procurement/budget.json', tostring)
        return write
    }

}