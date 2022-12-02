import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriverDto } from './interfaces/driver.dto';
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
    
    @Post('/add')
    addDriver(@Body() driverDto: DriverDto) {
        return this.driversServices.addDrivers(driverDto);
    }

    @Post('/delete')
    deleteDriver(@Body() param: {id: string}) {
        return this.driversServices.deleteDrivers(param.id);
    }

    @Post('/reset')
    driverReset(@Body() driver: Driver) {
        return this.driversServices.driverReset(driver);
    }

}
