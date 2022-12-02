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

    private orders: Order[] = [/* 
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
            distance: "40.3 km",
            accepted: true
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
            distance: "288 km",
            accepted: true
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
            distance: "495 km",
            accepted: true
        },
        {
            _id: 4,
            desc: "400 Caixas de Salgadinho Fandangos - Para Hipermercado Coop Capuava",
            weight: 800,
            addressin: "R. Jaime Ribeiro Wright, 1200 - Colônia (Zona Leste), São Paulo - SP",
            cepin: "08260-070",
            addressout: "Av. das Nações, 1600 - Parque Erasmo Assunção, Santo André",
            cepout: "09270-400",
            status: false,
            accepted: false,
            statusdesc: "Aguardando aprovação",
            distance: "16.6 km",
            price: 332
        }*/
    ];

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
            finished: false
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
            accepted: order.accepted
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
                statusdesc: 'Alocar recursos',
                price: order.price,
                distance: order.distance,
                accepted: accept.accepted
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

            if(newDesc.statusDesc == "Finalizar Entrega"){
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
                    finished: true
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
                    finished: order.finished
                };
            }

            return await this.ordersModel.findOneAndReplace({ _id: newDesc.orderId }, orderCopy).exec();
     
    }

}