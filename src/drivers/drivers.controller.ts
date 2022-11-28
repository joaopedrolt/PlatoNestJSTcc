import { Body, Controller, Get, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Driver } from './interfaces/drivers.interface';

@Controller('drivers')
export class DriversController {

    constructor(private driversServices: DriversService) { };

    @Get()
    getDrivers() {
        return this.driversServices.getDrivers();
    }

    @Get('/avaliable')
    avaliableDrivers() {
        return this.driversServices.getAvailibleDrivers();
    }

    @Post('/update')
    driverUpdate(@Body() driver: Driver) {
        return this.driversServices.driverUpdate(driver);
    }

}
