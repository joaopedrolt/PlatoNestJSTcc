import { Module } from '@nestjs/common';
import { GarageModule } from './garage/garage.module';

@Module({
  imports: [GarageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }