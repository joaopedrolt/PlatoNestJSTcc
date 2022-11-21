import { Injectable } from '@nestjs/common';
import { Gl } from './interfaces/gl.interface';

@Injectable()
export class DashboardService {

    private info: Gl = {
        yield: 25.86878,
        deliveries: 255,
        available: 12
    }

    getGlData() {
        return this.info;
    }

}
