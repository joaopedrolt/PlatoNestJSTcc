import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

    constructor(private dashBoardServices: DashboardService) { };

    @Get()
    getGlInfo() {
        return this.dashBoardServices.getGlData();
    }


}
