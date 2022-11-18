import { Controller, Get } from '@nestjs/common';
import { GarageService } from './garage.service';

@Controller('garage')
export class GarageController {

    constructor(private garageServices: GarageService){};

    @Get()
    trucks() {
        return this.garageServices.getGarageTrucks();
    }

}