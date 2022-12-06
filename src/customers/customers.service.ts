import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import { Cep } from 'src/orders/interfaces/cep.type';
import { Customer } from './interfaces/customer.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddCustomer, CustomerCredentials, CustomerEmailCnpj } from './interfaces/customer.dto';

@Injectable()
export class CustomersService {

    constructor(@InjectModel('Customers') private customerModel: Model<Customer>, private http: HttpService) { }

    async getAddresByCep(cep: string) {

        cep = cep.replace('-', '');

        const responseCep = this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(map(res => res.data));
        const Cep: Cep = await lastValueFrom(responseCep);

        const address: string = Cep.logradouro + ", " + Cep.localidade + ", " + Cep.uf;

        return { address }

    }

    async addCustomer(customer: AddCustomer) {
        const newCustomer = new this.customerModel(customer);
        return await newCustomer.save();
    }

    async checkCredentials(credentials: CustomerCredentials) {

        const customer = await this.customerModel.find({ email: credentials.email, password: credentials.password }).exec();

        if (customer.length > 0) {
            return {
                customer: {
                    name: customer[0].name,
                    cnpj: customer[0].cnpj
                },
                logged: true
            }
        } else {
            return {
                logged: false
            }
        }

    }

    async checkEmailCnpj(credentials: CustomerEmailCnpj) {

        const email = await this.customerModel.find({ email: credentials.email }).exec();
        const cnpj = await this.customerModel.find({ cnpj: credentials.cnpj }).exec();

        if (email.length > 0) {
            if (cnpj.length > 0) {
                return {
                    email: false,
                    cnpj: false
                }
            } else {
                return {
                    email: false,
                    cnpj: true
                }
            }
        } else if (cnpj.length > 0) {
            return {
                email: true,
                cnpj: false
            }
        } else {
            return {
                email: true,
                cnpj: true
            }
        }

    }

    async getByCnpj({ cnpj }: { cnpj: string }) {
        return await this.customerModel.findOne({ cnpj: cnpj }).exec();
    }

    async pushNewOrder({ orderId, customerId }: { orderId: string, customerId: string }) {

        const customer = await this.customerModel.findOne({ _id: customerId }).exec();

        let orderArray: string[];

        if (customer.orders) {
            orderArray = customer.orders;
            orderArray.push(orderId);
        } else {
            orderArray = [orderId];
        }

        const customerCopy = {
            name: customer.name,
            cnpj: customer.cnpj,
            numero: customer.numero,
            email: customer.email,
            password: customer.email,
            orders: orderArray
        };

        return await this.customerModel.findOneAndReplace({ _id: customerId }, customerCopy).exec();

    }

    async getOrders({ cnpj }: { cnpj: string }) {
        const response = await this.customerModel.find({ cnpj: cnpj }).exec();
        if (response.length > 0) {
            return response[0].orders;
        } else {
            return response;
        }
    }

}
