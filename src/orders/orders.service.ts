import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, } from 'axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { OrderUpdateDto } from './interfaces/order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {

    constructor(private http: HttpService) { }

    private orders: Order[] = [
        {
            _id: 1,
            desc: '500 Sacos de Arroz Camil - Para Hipermercado Coop Capuava',
            weight: 4000,
            addressin: 'R. Fortunato Ferraz, 1141 - Vila Anastácio, São Paulo - SP',
            cepin: '05093-000',
            addressout: 'Av. das Nações, 1600 - Parque Erasmo Assunção, Santo André',
            cepout: '09270-400',
            status: false,
            statusdesc: 'Alocar recursos',
            price: 4030.00,
            distance: "40.3 km"

        },
        {
            _id: 2,
            desc: '100 Fardos de Leite Mococca - Para Hipermercado Coop Capuava',
            weight: 2000,
            addressin: 'R. Gabriel Pinheiro, 1030 - Centro, Mococa - SP',
            cepin: '13730-090',
            addressout: 'Av. das Nações, 1600 - Parque Erasmo Assunção, Santo André',
            cepout: '09270-400',
            status: true,
            statusdesc: 'Aguardando motorista sair p/ retirar carga',
            truck: {
                _id: 2,
                model: 'Merces Beazn 55 300',
                plateNumber: 'ABC-1A33f',
                axle: 'Eixo Triplo',
                maxcapacity: 100,
                status: true
            },
            driver: {
                _id: 1,
                name: 'Giovanni Diniz',
                status: true,
                orderid: 2
            },
            price: 14400.00,
            distance: "288 km"
        },
        {
            _id: 3,
            desc: '100 Fardos de Cerveja Itaipava - Para HiperMercado Coop Capuava',
            weight: 1000,
            addressin: 'R. Trajano Paula Filho, 199 - Pedro do Rio, Petrópolis',
            cepin: '25750-160',
            addressout: 'Av. das Nações, 1600 - Parque Erasmo Assunção, Santo André',
            cepout: '09270-400',
            status: true,
            statusdesc: 'Aguardando motorista sair p/ retirar carga',
            truck: {
                _id: 1,
                model: 'Carreta Baú Sider Vanderleia',
                plateNumber: 'DCA-1A23',
                axle: 'Eixo Padrão',
                maxcapacity: 2000,
                status: true
            },
            driver: {
                _id: 2,
                name: 'Marcos Henrique',
                status: true,
                orderid: 3
            },
            price: 10890.00,
            distance: "495 km"
        }
    ];

    getOrders() {
        return this.orders;
    }

    getOrderById(id: string) {
        let order = this.orders.find(order => order._id == parseInt(id));
        return order;
    }

    async addOrder(order: Order) {

        const path = `http://localhost:3000/api/orders/dp?cepin=${order.cepin}&cepout=${order.cepout}&weight=${order.weight}`;

        const responseDp = this.http.get(path).pipe(map((res) => res.data));
        let distanceAndPrice = await lastValueFrom(responseDp);
        const { price, distance } = distanceAndPrice;

        const copyOrder: Order = { ...order, distance: distance, price: parseFloat(price) }

        try {
            this.orders.push(copyOrder);
            return { done: 'worked' };
        } catch (error) {
            return { error: error };
        }

    }

    async updateOrder(id: string, orderUpdateDto: OrderUpdateDto) {

        const index = this.orders.findIndex(order => {
            return order._id === parseInt(id);
        });

        const { driver, truck } = orderUpdateDto;

        let orderCopy = this.orders[index];
        orderCopy = { ...orderCopy, statusdesc: 'Aguardando motorista sair p/ retirar carga', status: true, driver: driver, truck: truck }

        this.orders.splice(index, 1, orderCopy);

    }

    test(){

        const url = 'http://localhost:3000/api/drivers/update';

        this.http.post(url, {
            _id: 4,
            name: 'Giovanni Diniz',
            status: true,
            orderid: 2
        }, )

    }

}