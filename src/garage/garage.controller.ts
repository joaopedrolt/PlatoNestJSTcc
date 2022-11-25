import { Controller, Get, Post } from '@nestjs/common';
import { GarageService } from './garage.service';

@Controller('garage')
export class GarageController {

    constructor(private garageServices: GarageService){};

    @Get()
    garage() {
        return this.garageServices.getGarageTrucks();
    }

    @Get('/avaliable')
    avaliableTruck( ) {
        return this.garageServices.getAvailibleTrucks();
    }

    @Post('/add')
    addTruck( ) {
       
    }

}