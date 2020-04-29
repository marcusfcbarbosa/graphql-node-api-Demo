import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/1_modules/store-module/3-entities/order.entity';


//Repository Pattern
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>) { }

    async getByNumber(number: string): Promise<Order> {
        return await this.repository.findOne({ number: number });
    }

    async getByCustomer(customer: string): Promise<Order[]> {
        return await this.repository.find({ customer: customer });
    }

    async post(order: Order) {
        await this.repository.save(order);
    }
}