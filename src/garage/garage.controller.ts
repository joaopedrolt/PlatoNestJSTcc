import { Controller, Get } from '@nestjs/common';
import { GarageService } from './garage.service';

@Controller('garage')
export class GarageController {

    constructor(private garageServices: GarageService){};

    @Get()
    garage() {
        return this.garageServices.getGarageTrucks();
    }

}