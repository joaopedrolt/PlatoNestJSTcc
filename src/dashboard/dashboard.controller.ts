import { Controller, Get, Post, Body } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

    constructor(private dashBoardServices: DashboardService) { };
    
    @Get()
    getGlInfo() {
        return this.dashBoardServices.getGlData();
    }

    /* @Post()
    sumYield(@Body() value: { value: number}) {
        return this.dashBoardServices.sumYield(value.value);
    } */

}
