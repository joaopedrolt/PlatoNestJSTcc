import { Injectable } from '@nestjs/common';

import { TruckAdd } from './interfaces/truck-add.dto';
import { Truck } from './interfaces/truck.interface';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GarageService {

    constructor(@InjectModel('Trucks') private trucksModel: Model<Truck>) { }

    async getGarageTrucks() {
        return await this.trucksModel.find().exec();
    }

    async getAvailibleTrucks() {
        return await this.trucksModel.find({ status: false }).exec();
    }

    async addNewTruck(truckAdd: TruckAdd) {

        const { model, plateNumber, axle, maxcapacity } = truckAdd;

        const truck = {
            model,
            plateNumber,
            axle,
            maxcapacity,
            status: false
        }

        const newTruck = new this.trucksModel(truck);
        return await newTruck.save();

    }

    async deleteTruck(_id: string) {
        return await this.trucksModel.remove({ _id: _id }).exec();;
    }

    async truckUpdate(truckParam: Truck) {

        const { model, plateNumber, axle, maxcapacity, orderid, status } = truckParam;

        const truck = {
            model,
            plateNumber,
            axle,
            maxcapacity,
            status,
            orderid,
        }

        return await this.trucksModel.findOneAndReplace({ _id: truckParam._id }, truck).exec();

    }
}
