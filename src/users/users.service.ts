import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogin, UserModel } from './interfaces/user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private usersModel: Model<User>) { }

    async addUser(user: UserModel) {
        const newUserModel = new this.usersModel(user);
        return await newUserModel.save()
    }

    async deleteUser(name: string) {
        return await this.usersModel.deleteOne({ name: name }).exec();
    }

    async checkCredentials(userCredentials: UserLogin) {
        const user = await this.usersModel.find({ user: userCredentials.user, password: userCredentials.password });

        if (user.length > 0) {
            return {
                user: {
                    role: user[0].role,
                    name: user[0].name
                },
                logged: true
            }
        } else {
            return {
                logged: false
            }
        }
        
    }

    async driverValidation(user: string) {

        const userResponse = await this.usersModel.find({ user }).exec();

        if (userResponse.length > 0) {
            return {user: false};
        } else {
            return {user: true};
        }

    }

}
