import { Controller, Get, Post, Body } from '@nestjs/common';
import { GarageService } from './garage.service';
import { TruckAdd } from './interfaces/truck-add.dto';
import { Truck } from './interfaces/truck.interface';

@Controller('garage')
export class GarageController {

    constructor(private garageServices: GarageService) { };

    @Get()
    garage() {
        return this.garageServices.getGarageTrucks();
    }

    @Get('/avaliable')
    avaliableTruck() {
        return this.garageServices.getAvailibleTrucks();
    }

    @Post('/add')
    addTruck(@Body() truckAdd: TruckAdd) {
        return this.garageServices.addNewTruck(truckAdd);
    }

    @Post('/delete')
    deleteTruck(@Body() { _id }: { _id: string }) {
        return this.garageServices.deleteTruck(_id);
    }

    @Post('/update')
    truckUpdate(@Body() truck: Truck) {
        return this.garageServices.truckUpdate(truck);
    }

    @Post('/reset')
    truckReset(@Body() truck: Truck) {
        return this.garageServices.truckUpdate(truck);
    }

}