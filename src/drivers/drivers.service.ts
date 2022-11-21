import { Injectable } from '@nestjs/common';
import { Driver } from './interfaces/drivers.interface';

@Injectable()
export class DriversService {

    private drivers: Driver[] = [
        {
            _id: 1,
            name: 'Joao Pedro Lima',
            status: true
        },
        {
            _id: 2,
            name: 'Marcos Henrique',
            status: false,
            orderid: 1
        }
    ];

    getDrivers(){
        return this.drivers;
    }

}
