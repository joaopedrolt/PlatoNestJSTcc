import { Module } from '@nestjs/common';
import { GarageModule } from './garage/garage.module';
import { OrdersModule } from './orders/orders.module';
import { DriversModule } from './drivers/drivers.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [GarageModule, OrdersModule, DriversModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule { }