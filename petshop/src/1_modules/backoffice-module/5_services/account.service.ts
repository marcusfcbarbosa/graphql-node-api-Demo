import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../8_models/user.model';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AccountService {
    //Toda vez que criar uma instancia do serviço, ele ja cria uma instancia do Model por padrão
    //Singlton a nivel de classe e nao de aplicacao
    constructor(@InjectModel('User') private readonly model: Model<User>) {
    }

    //Assincrono
    async create(data: User): Promise<User> {
        const user = new this.model(data);
        return await user.save();
    }

    async findOneByUserName(data: string){
        const user = new this.model(data);
        return await user.save();
    }



    update(data: User) {
        const user = new this.model(data);
    }

}