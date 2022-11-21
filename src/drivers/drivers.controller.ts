import { Controller, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {

    constructor(private driversServices: DriversService) { };

    @Get()
    getDrivers() {
        return this.driversServices.getDrivers();
    }

}
