import { Body, Controller, Post } from '@nestjs/common';
import { UserLogin, UserModel } from './interfaces/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersServices: UsersService) { };

    @Post('/add')
    addNewUser(@Body() user: UserModel){
        return this.usersServices.addUser(user)
    }

    @Post('/delete')
    deleteUser(@Body() body: {name: string} ){
        return this.usersServices.deleteUser(body.name);
    }

    @Post('/check')
    checkCredentials(@Body() user: UserLogin){
        return this.usersServices.checkCredentials(user)
    }

    @Post('/validation')
    driverValidation(@Body() body: { user: string }) {
        return this.usersServices.driverValidation(body.user);
    }

}
