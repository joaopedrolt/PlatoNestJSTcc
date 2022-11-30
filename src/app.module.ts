import { Module } from '@nestjs/common';
import { GarageModule } from './garage/garage.module';
import { OrdersModule } from './orders/orders.module';
import { DriversModule } from './drivers/drivers.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GarageModule,
    OrdersModule,
    DriversModule,
    DashboardModule,
    MongooseModule.forRoot('mongodb+srv://admin:lSi0B7vFVYu4PYCc@cluster0.eewgjf0.mongodb.net/plato?retryWrites=true&w=majority',),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }