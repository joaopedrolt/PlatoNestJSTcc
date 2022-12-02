import { Injectable } from '@nestjs/common';

import { Driver } from './interfaces/drivers.interface';
import { DriverDto } from './interfaces/driver.dto';

import { HttpService } from "@nestjs/axios";

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class DriversService {

    constructor(@InjectModel('Drivers') private driversModel: Model<Driver>, private http: HttpService) { }

    async getDrivers() {
        return await this.driversModel.find().exec();
    }

    async addDrivers(driverDto: DriverDto) {
        const newDriver = new this.driversModel(driverDto);
        return await newDriver.save();
    }

    async deleteDrivers(_id: string) {
        return await this.driversModel.deleteOne({ _id: _id }).exec();
    }

    async getAvailibleDrivers() {
        return await this.driversModel.find({ status: false }).exec();
    }

    async driverUpdate(driverParam: Driver) {

        const driver = {
            name: driverParam.name,
            status: driverParam.status,
            orderid: driverParam.orderid
        }

        return await this.driversModel.findOneAndReplace({ _id: driverParam._id }, driver).exec();

    }

    async driverReset(driverParam: Driver) {

        const driver = {
            name: driverParam.name,
            status: driverParam.status
        }

        return await this.driversModel.findOneAndReplace({ _id: driverParam._id }, driver).exec();

    }

}
