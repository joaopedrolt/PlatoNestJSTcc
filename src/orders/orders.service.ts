import { Injectable } from '@nestjs/common';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrdersService {

    private orders: Order[] = [
        {
            _id: 1,
            desc: 'dadasdasdasdasdad',
            size: 2,
            weight: 2,
            amount: 2,
            container: 2,
            addressin: 'dasdasda',
            addressout: 'dadadsadadas',
            status: true
        },
        {
            _id: 2,
            desc: 'hfdghfghfg',
            size: 2,
            weight: 2,
            amount: 2,
            container: 2,
            addressin: 'hfghgfh',
            addressout: 'hgfhfg',
            status: false
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
