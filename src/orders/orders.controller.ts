import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrderDto, OrderUpdateDto } from './interfaces/order.dto';
import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';
import { OrdersPriceService } from './price.service';

@Controller('orders')
export class OrdersController {

    constructor(private ordersServices: OrdersService, private ordersPriceServices: OrdersPriceService) { };

    @Post('/teste')
    teste() {
        return this.ordersServices.test();
    }

    @Get()
    orders() {
        return this.ordersServices.getOrders();
    }

    @Get('/dp')
    getPriceAndDistance(@Query() order) {
        const orderDto: OrderDto = { cepOut: order.cepout, cepIn: order.cepin, weight: parseFloat(order.weight) }
        return this.ordersPriceServices.getDistanceAndPrice(orderDto);
    }

    @Get('/distance')
    getDistance(@Query() query) {
        return this.ordersPriceServices.getDistance(query.cepin, query.cepout);
    }

    @Patch('/update/:id')
    update(@Param('id') id: string, @Body() orderUpdateDto: OrderUpdateDto) {
    return this.ordersServices.updateOrder(id, orderUpdateDto);
  }

    @Get('/price')
    getPrice(@Query() order) {
        const orderDto: OrderDto = { cepOut: order.cepout, cepIn: order.cepin, weight: parseFloat(order.weight) }
        return this.ordersPriceServices.getPrice(orderDto);
    }

    @Post('/add')
    addOrder(@Body() order: Order) {
        return this.ordersServices.addOrder(order);
    }

    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersServices.getOrderById(id);
    }

}