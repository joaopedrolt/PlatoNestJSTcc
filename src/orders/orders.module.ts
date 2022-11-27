import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersPriceService } from './price.service';

import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersPriceService]
})
export class OrdersModule { }
