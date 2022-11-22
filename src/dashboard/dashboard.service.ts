import { Injectable } from '@nestjs/common';
import { Gl } from './interfaces/gl.interface';

@Injectable()
export class DashboardService {

    private yield: number = 25868.78;

    private info: Gl = {
        yield: this.yield.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        deliveries: 255,
        available: 12,
        date: "DIA/MES/ANO"
    }

    getGlData() {
        return this.info;
    }

}
