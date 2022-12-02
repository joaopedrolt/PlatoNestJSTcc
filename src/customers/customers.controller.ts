import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {

    constructor(private customersServices: CustomersService) { };

   @Get('/address/:cep')
   getAddresByCep(@Param('cep') cep: string){
        return this.customersServices.getAddresByCep(cep);
   }

}