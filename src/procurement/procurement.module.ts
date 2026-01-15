import { Module } from '@nestjs/common';
import { ProcurementController } from './procurement.controller.js';
import { ProcurementService } from './procurement.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Procurement } from './procurement.entity.js';

@Module({
  controllers: [ProcurementController],
  providers: [ProcurementService],
  imports:[SequelizeModule.forFeature([Procurement])]
})
export class ProcurementModule {}
