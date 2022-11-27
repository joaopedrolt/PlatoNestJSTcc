import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';

import { Cep } from './interfaces/cep.type';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersPriceService {

    constructor(private http: HttpService) { }

    async getDistance(cepInParam: string, cepOutParam: string) {

        cepInParam = cepInParam.replace('-', '');
        cepOutParam = cepOutParam.replace('-', '');

        const responseCepIn = this.http.get(`https://viacep.com.br/ws/${cepInParam}/json/`).pipe(map(res => res.data));
        const cepIn: Cep = await lastValueFrom(responseCepIn);

        const responseCepOut = this.http.get(`https://viacep.com.br/ws/${cepOutParam}/json/`).pipe(map(res => res.data));
        const cepOut: Cep = await lastValueFrom(responseCepOut);

        const origins = encodeURIComponent(cepIn.logradouro + '+' + cepIn.localidade + '+' + cepIn.uf)
        const destinations = encodeURIComponent(cepOut.logradouro + '+' + cepOut.localidade + '+' + cepOut.uf)

        return this.http
            .get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&units=metric&key=`)
            .pipe(
                map((res) => res.data?.rows),
                map((rows) => rows?.[0].elements),
                map((elements) => elements?.[0].distance),
                map((distance) => {
                    return distance?.text;
                })
            )

    }

    async getPrice(order: Order) {

        const path = "http://localhost:3000/api/orders/distance?cepin=" + order.cepin + "&cepout=" + order.cepout;

        const responseCepIn = this.http.get(path).pipe(map(res => res.data));
        let distance: string = await lastValueFrom(responseCepIn);
        distance = distance.replace(' km', '');
        distance = distance.replace(',', '');
        
        const price = order.weight * (parseFloat(distance) * 0.1);

        return price.toFixed(2);
    }

}