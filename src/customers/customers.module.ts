import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './interfaces/customer.schema';

import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: "Customers", schema: CustomerSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
