import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GlSchema } from './interfaces/gl.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Gldashboard", schema: GlSchema }])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
