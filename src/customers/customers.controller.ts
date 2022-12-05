import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AddCustomer, CustomerCredentials } from './interfaces/customer.dto';

@Controller('customers')
export class CustomersController {

     constructor(private customersServices: CustomersService) { };

     @Get('/address/:cep')
     getAddresByCep(@Param('cep') cep: string) {
          return this.customersServices.getAddresByCep(cep);
     }

     @Post('/add')
     addCustomer(@Body() customer: AddCustomer) {
          return this.customersServices.addCustomer(customer);
     }

     @Post('/check')
     checkCredentials(@Body() credentials: CustomerCredentials) {
          return this.customersServices.checkCredentials(credentials);
     }

     @Post('/cnpj')
     getByCnpj(@Body() cnpj: { cnpj: string }) {
          return this.customersServices.getByCnpj(cnpj);
     }

     @Post('/pushorder')
     pushNewOrder(@Body() orderId: { orderId: string, customerId: string }) {
          return this.customersServices.pushNewOrder(orderId);
     }

     @Post('/order/cnpj')
     getOrders(@Body() cnpj: { cnpj: string }) {
          return this.customersServices.getOrders(cnpj);
     }

}