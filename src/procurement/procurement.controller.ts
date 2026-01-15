import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from "../validation.pipe.js";
import { ProcurementDto } from './valid-procurement.dto.js';
import { ProcurementService } from './procurement.service.js';

@Controller('transactions')
export class ProcurementController {
    constructor(private procurementService : ProcurementService){}
    @Post('purchase')
    async procurement(@Body(new ValidationPipe()) procurementDto:ProcurementDto){
        try {
            return await this.procurementService.buying(procurementDto)
        } catch (error) {
            console.log(error.message);
 
        }
    }
}