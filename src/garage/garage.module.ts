import { Module } from '@nestjs/common';
import { GarageController } from './garage.controller';

@Module({
  controllers: [GarageController]
})
export class GarageModule {}