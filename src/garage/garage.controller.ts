import { Controller, Get } from '@nestjs/common';

@Controller('garage')
export class GarageController {

    @Get()
    async trucks() {
        return { trucks: [{ modelo: 'mercedez' }, { modelo: 'fiat' }] };
    }

}