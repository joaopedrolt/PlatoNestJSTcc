import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

import { HttpModule } from '@nestjs/axios'

import { MongooseModule } from '@nestjs/mongoose';
import { DriversSchema } from './interfaces/drivers.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: "Drivers", schema: DriversSchema }])],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule { }
