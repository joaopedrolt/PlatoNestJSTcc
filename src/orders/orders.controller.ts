import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';
import { OrdersPriceService } from './price.service';

@Controller('orders')
export class OrdersController {

    constructor(private ordersServices: OrdersService, private ordersPriceServices: OrdersPriceService) { };

    @Get()
    orders() {
        return this.ordersServices.getOrders();
    }

    @Get('/distance')
    getDistance(@Query() query) {
        return this.ordersPriceServices.getDistance(query.cepin, query.cepout);
    }

    @Get('/price')
    getPrice(@Body () order: Order) {
        return this.ordersPriceServices.getPrice(order);
    }

    @Get(':id')
    order(@Param('id') id: string) {
        return this.ordersServices.getOrderById(id);
    }

}