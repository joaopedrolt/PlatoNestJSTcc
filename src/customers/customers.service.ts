import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import { Cep } from 'src/orders/interfaces/cep.type';

@Injectable()
export class CustomersService {

    constructor(private http: HttpService) { }

    async getAddresByCep(cep: string) {

        cep = cep.replace('-', '');

        const responseCep = this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(map(res => res.data));
        const Cep: Cep = await lastValueFrom(responseCep);

        const address: string = Cep.logradouro + ", " + Cep.localidade + ", " + Cep.uf;

        return { address }

    }

}
