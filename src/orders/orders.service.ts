import { Injectable } from '@nestjs/common';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {

    private orders: Order[] = [
        {
            _id: 1,
            desc: 'Pendente 1',
            size: 2,
            weight: 2,
            amount: 2,
            container: 2,
            addressin: 'dasdasda',
            addressout: 'dadadsadadas',
            status: false
        },
        {
            _id: 2,
            desc: 'Em Andamento 2',
            size: 2,
            weight: 2,
            amount: 2,
            container: 2,
            addressin: 'hfghgfh',
            addressout: 'hgfhfg',
            status: true,
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
                name: 'Joao Pedro Lima',
                status: true,
                orderid: 2
            }
        },
        {
            _id: 3,
            desc: 'Em Andamento 3',
            size: 2,
            weight: 2,
            amount: 2,
            container: 2,
            addressin: 'hfghgfh',
            addressout: 'hgfhfg',
            status: true,
            truck: {
                _id: 1,
                model: 'xxxxx',
                plateNumber: 'ABC-1A33',
                axle: 'Eixo Triplo',
                maxcapacity: 100,
                status: true
            },
            driver: {
                _id: 2,
                name: 'Marcos Henrique',
                status: true,
                orderid: 3
            }
        }

    ];

    getOrders() {
        return this.orders;
    }

    getOrderById(id: string) {
        let order = this.orders.find(order => order._id == parseInt(id));
        return order;
    }

}