import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AcceptOrder, OrderAdd, OrderDto, OrderUpdateDto } from './interfaces/order.dto';
import { OrdersService } from './orders.service';
import { OrdersPriceService } from './price.service';

@Controller('orders')
export class OrdersController {

    constructor(private ordersServices: OrdersService, private ordersPriceServices: OrdersPriceService) { };

    @Post('/add')
    addOrder(@Body() order: OrderAdd) {
        return this.ordersServices.addOrder(order);
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

    @Post('/driverorder')
    get(@Body() body: {name: string}) {
        return this.ordersServices.getDriverOrder(body);
    }

    @Get('/price')
    getPrice(@Query() order) {
        const orderDto: OrderDto = { cepOut: order.cepout, cepIn: order.cepin, weight: parseFloat(order.weight) }
        return this.ordersPriceServices.getPrice(orderDto);
    }

    @Post('/accept')
    acceptOrder(@Body() accept: AcceptOrder) {
        return this.ordersServices.acceptOrder(accept);
    }

    @Patch('/update/:id')
    update(@Param('id') id: string, @Body() orderUpdateDto: OrderUpdateDto) {
        return this.ordersServices.updateOrder(id, orderUpdateDto);
    }

    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersServices.getOrderById(id);
    }

}