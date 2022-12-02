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

    async sumYield(value: number) {

        const actualGlData = await this.glModel.findOne({ _id: '6385885bbc391201f1d14deb' }).exec();
        const actualYield = actualGlData.yield + value;

        const glNewInfo = {
            yield: actualYield,
            deliveries: actualGlData.deliveries + 1
        }

        return await this.glModel.findOneAndReplace({ _id: '6385885bbc391201f1d14deb' }, glNewInfo).exec();

    }

}
