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
            status: true
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
            status: true
        }
        
    ];

    getOrders() {
        return this.orders;
    }

    getOrderById(id: string){
        let order = this.orders.find(order => order._id == parseInt(id));
        return order;
    }

}
