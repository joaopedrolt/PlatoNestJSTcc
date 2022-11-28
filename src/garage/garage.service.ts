import { Injectable } from '@nestjs/common';
import { TruckAdd } from './interfaces/truck-add.dto';
import { Truck } from './interfaces/truck.interface';

@Injectable()
export class GarageService {

    private trucks: Truck[] = [
        {
            _id: 1,
            model: 'Carreta Sider Carreta Baú Vanderleia',
            plateNumber: 'DCA-1A23',
            axle: 'Eixo Padrão',
            maxcapacity: 2000,
            status: true
        },
        {
            _id: 2,
            model: 'Merces Beazn 55 300',
            plateNumber: 'ABC-1A32',
            axle: 'Eixo Triplo',
            maxcapacity: 1000,
            status: true
        },
        {
            _id: 3,
            model: 'Fachini Rodocaçamba 2023',
            plateNumber: 'LFV-2A64',
            axle: 'Eixo Triplo',
            maxcapacity: 4000,
            status: false
        }
    ];

    getGarageTrucks() {
        return this.trucks;
    }

    getAvailibleTrucks() {
        return this.trucks.filter(e => e.status === false);
    }

    addNewTruck(truckAdd: TruckAdd) {
        const { model, plateNumber, axle, maxcapacity } = truckAdd;
        this.trucks.push({ _id: 3, model, plateNumber, axle, maxcapacity, status: false })
        return truckAdd;
    }

    deleteTruck(_id: number) {
        this.trucks = this.trucks.filter(truck => { return truck._id != _id });
        return { result: 'done' };
    }

    truckUpdate(truckParam: Truck) {

        const index = this.trucks.findIndex(truck => {
            return truck._id === truckParam._id;
        });

        this.trucks.splice(index, 1, truckParam);

    }

}
