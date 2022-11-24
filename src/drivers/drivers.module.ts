import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
