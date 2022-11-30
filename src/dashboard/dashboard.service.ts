import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gl } from './interfaces/gl.interface';

@Injectable()
export class DashboardService {

    constructor(@InjectModel('Gldashboard') private glModel: Model<Gl>) { }

    async getGlData() {
        return await this.glModel.find().exec();
    }

   /*  async sumYield(value: number) {

        const actualGlData = await this.glModel.find().exec();
        const actualYield = actualGlData.values;

        const newDriver = new this.glModel({yield: 0.00 , deliveries: 0});
        return actualYield;
    } */

}
