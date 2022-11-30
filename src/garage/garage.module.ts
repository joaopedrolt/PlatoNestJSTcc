import { Module } from '@nestjs/common';
import { GarageController } from './garage.controller';
import { GarageService } from './garage.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TruckSchema } from './interfaces/truck.schema'; 

@Module({
  imports: [MongooseModule.forFeature([{ name: "Trucks", schema: TruckSchema }])],
  controllers: [GarageController],
  providers: [GarageService]
})
export class GarageModule {}