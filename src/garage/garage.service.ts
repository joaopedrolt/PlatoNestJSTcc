import { Injectable } from '@nestjs/common';
import { Truck } from './interfaces/truck.interface';

@Injectable()
export class GarageService {

    private trucks: Truck[] = [
        {
            _id: 1,
            model: 'xxxxx',
            plateNumber: 'ABC-1A33',
            axle: 'Eixo Triplo',
            maxcapacity: 100,
            status: true
        },
        {
            _id: 2,
            model: 'Merces Beazn 55 300',
            plateNumber: 'ABC-1A33f',
            axle: 'Eixo Triplo',
            maxcapacity: 100,
            status: true
        }
    ];

    getGarageTrucks() {
        return this.trucks;
    }

    getAvailibleTrucks(){
        return this.trucks.filter(e => e.status === true);
    }

}
