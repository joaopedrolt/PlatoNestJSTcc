import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';

import { Cep } from './interfaces/cep.type';
import { OrderDto } from './interfaces/order.dto';

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
            .get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&units=metric&key=AIzaSyAvDJR7162n3hAOb0TuQafdssfXy7VwtnA`)
            .pipe(
                map((res) => res.data?.rows),
                map((rows) => rows?.[0].elements),
                map((elements) => elements?.[0].distance),
                map((distance) => {
                    return distance?.text;
                })
            )

    }

    async getPrice(order: OrderDto) {

        const path = "http://localhost:3000/api/orders/distance?cepin=" + order.cepIn + "&cepout=" + order.cepOut;

        const responseCepIn = this.http.get(path).pipe(map(res => res.data));
        let distance: string = await lastValueFrom(responseCepIn);
        distance = distance.replace(' km', '');
        distance = distance.replace(',', '');

        const price = order.weight * (parseFloat(distance) * 0.1);

        return price.toFixed(2);

    }

    async getDistanceAndPrice(order: OrderDto) {

        const path = "http://localhost:3000/api/orders/distance?cepin=" + order.cepIn + "&cepout=" + order.cepOut;

        const responseCepIn = this.http.get(path).pipe(map(res => res.data));
        let distance: string = await lastValueFrom(responseCepIn);

        const distanceCopy = distance;

        distance = distance.replace(' km', '');
        distance = distance.replace(',', '');

        const price = order.weight * (parseFloat(distance) * 0.025);

        return {price: price.toFixed(2), distance: distanceCopy};

    }

}