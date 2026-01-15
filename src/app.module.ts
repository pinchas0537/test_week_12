import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProcurementModule } from './procurement/procurement.module.js';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'idf-procurement',
      autoLoadModels:true,
      synchronize:true,
    })
    ,ProcurementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
