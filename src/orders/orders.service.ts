import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

import { AcceptOrder, OrderAdd, OrderUpdateDto, UpdateOrderDesc } from './interfaces/order.dto';
import { Order } from './interfaces/order.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

    constructor(@InjectModel('Orders') private ordersModel: Model<Order>, private http: HttpService) { }

    async getOrders() {
        return await this.ordersModel.find().exec();
    }

    async getOrderById(id: string) {
        return await this.ordersModel.findOne({ _id: id }).exec();
    }

    async addOrder(order: OrderAdd) {

        const path = `http://localhost:3000/api/orders/dp?cepin=${order.cepin}&cepout=${order.cepout}&weight=${order.weight}`;

        const responseDp = this.http.get(path).pipe(map((res) => res.data));
        let distanceAndPrice = await lastValueFrom(responseDp);

        const { price, distance } = distanceAndPrice;

        const copyOrder = {
            desc: order.desc,
            weight: order.weight,
            addressin: order.addressin,
            cepin: order.cepin,
            addressout: order.addressout,
            cepout: order.cepout,
            status: false,
            accepted: false,
            statusdesc: 'Aguardando aprovação',
            distance: distance,
            price: parseFloat(price),
            finished: false,
            customer: order.customer
        }

        try {
            const newOrder = new this.ordersModel(copyOrder);
            return await newOrder.save();
        } catch (error) {
            return { error: error };
        }

    }

    async updateOrder(id: string, orderUpdateDto: OrderUpdateDto) {

        const { driver, truck } = orderUpdateDto;

        const order = await this.ordersModel.findOne({ _id: id }).exec();

        const orderCopy = {
            desc: order.desc,
            weight: order.weight,
            addressin: order.addressin,
            cepin: order.cepin,
            addressout: order.addressout,
            cepout: order.cepout,
            status: true,
            statusdesc: 'Aguardando motorista sair para retirar carga',
            driver: driver,
            truck: truck,
            price: order.price,
            distance: order.distance,
            accepted: order.accepted,
            customer: order.customer
        };

        return await this.ordersModel.findOneAndReplace({ _id: id }, orderCopy).exec();

    }

    async acceptOrder(accept: AcceptOrder) {

        if (accept.accepted) {

            const order = await this.ordersModel.findOne({ _id: accept.orderId }).exec();

            const orderCopy = {
                desc: order.desc,
                weight: order.weight,
                addressin: order.addressin,
                cepin: order.cepin,
                addressout: order.addressout,
                cepout: order.cepout,
                status: order.status,
                statusdesc: 'Aguardando Pagamento',
                price: order.price,
                distance: order.distance,
                accepted: accept.accepted,
                customer: order.customer
            };

            return await this.ordersModel.findOneAndReplace({ _id: accept.orderId }, orderCopy).exec();

        } else {
            return await this.ordersModel.remove({ _id: accept.orderId }).exec();
        }

    }

    async getDriverOrder(name: { name: string }) {

        const order = await this.ordersModel.find();
        let foundOrder = order.filter(order => order.driver.name == name.name);
        foundOrder = foundOrder.filter(order => order.finished != true);

        if (foundOrder.length > 0) {
            return foundOrder[0];
        } else {
            return {}
        }

    }

    async updateOrderDesc(newDesc: UpdateOrderDesc) {

        const order = await this.ordersModel.findOne({ _id: newDesc.orderId }).exec();

        let orderCopy = {};

        if (newDesc.statusDesc == "Finalizar Entrega") {
            orderCopy = {
                desc: order.desc,
                weight: order.weight,
                addressin: order.addressin,
                cepin: order.cepin,
                addressout: order.addressout,
                cepout: order.cepout,
                price: order.price,
                distance: order.distance,
                driver: order.driver,
                truck: order.truck,
                statusdesc: "Finalizado com sucesso",
                status: order.status,
                accepted: order.accepted,
                finished: true,
                customer: order.customer
            };
        } else {
            orderCopy = {
                desc: order.desc,
                weight: order.weight,
                addressin: order.addressin,
                cepin: order.cepin,
                addressout: order.addressout,
                cepout: order.cepout,
                price: order.price,
                distance: order.distance,
                driver: order.driver,
                truck: order.truck,
                statusdesc: newDesc.statusDesc,
                status: order.status,
                accepted: order.accepted,
                finished: order.finished,
                customer: order.customer
            };
        }

        return await this.ordersModel.findOneAndReplace({ _id: newDesc.orderId }, orderCopy).exec();

    }

    async getOrderByCnpj({cnpj}: {cnpj: string}) {
        const order = await this.ordersModel.find().exec();
        let foundOrder = order.filter(order => order.customer.cnpj == cnpj);
     
        if (foundOrder.length > 0) {
            return foundOrder;
        } else {
            return cnpj;
        }
    }
    
}