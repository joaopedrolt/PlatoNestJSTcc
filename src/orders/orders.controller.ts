import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private ordersServices: OrdersService) { };

    @Get()
    orders() {
        return this.ordersServices.getOrders();
    }
    
    @Get(':id')
    order(@Param('id') id: string) {
        return this.ordersServices.getOrderById(id);
    }

}