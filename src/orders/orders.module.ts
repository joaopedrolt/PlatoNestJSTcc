import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersPriceService } from './price.service';

import { HttpModule } from '@nestjs/axios'

import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './interfaces/order.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersPriceService]
})
export class OrdersModule { }
