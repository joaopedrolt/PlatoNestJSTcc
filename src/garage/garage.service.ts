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
        return await this.trucksModel.deleteOne({ _id: _id }).exec();;
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

    async truckReset(truckParam: Truck) {

        const { model, plateNumber, axle, maxcapacity } = truckParam;

        const truck = {
            model,
            plateNumber,
            axle,
            maxcapacity,
            status: false
        }

        return await this.trucksModel.findOneAndReplace({ _id: truckParam._id }, truck).exec();

    }

    async truckValidation({ plateNumber, model }: { plateNumber: string, model: string }) {

        const modelResponse = await this.trucksModel.find({ model }).exec();

        const plateResponse = await this.trucksModel.find({ plateNumber }).exec();

        if (modelResponse.length > 0) {
            if (plateResponse.length > 0) {
                return {
                    model: false,
                    plateNumber: false
                }
            } else {
                return {
                    model: false,
                    plateNumber: true
                }
            }
        } else if (plateResponse.length > 0) {
            return {
                model: true,
                plateNumber: false
            }
        } else {
            return {
                model: true,
                plateNumber: true
            }
        }

    }

}
