import { Injectable } from '@nestjs/common';
import { Gl } from './interfaces/gl.interface';
import { TimeZone } from './interfaces/timezone.interface';

@Injectable()
export class DashboardService {

    private info: Gl = {
        yield: 25.86878,
        deliveries: 255,
        available: 12,
        date: "DIA/MES/ANO"
    }

    getGlData() {
        return this.info;
    }

}
