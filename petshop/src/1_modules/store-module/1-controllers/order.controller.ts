import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ResultDto } from '../2-dtos/result.dto';
import { OrderService } from '../4-services/order.service';
import { OrderItemService } from '../4-services/order-item.service';
import { ProductService } from '../4-services/product.service';
import { OrderItem } from '../3-entities/order-item.entity';
import { OrderItemDto } from '../2-dtos/order-item.dto';
import { Order } from '../3-entities/order.entity';

@Controller('v1/Orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService,
    ) { }

    @Get(':order')
    async get(@Param('order') order: string) {
        try {
            const _order = await this.orderService.getByNumber(order);
            return new ResultDto('', true, _order, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
    @Get(':customer')
    async getCustomer(@Param('customer') customer: string) {
        try {
            const _order = await this.orderService.getByCustomer(customer);
            return new ResultDto('', true, _order, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
    
    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '1236547895';//vem do token ( JWT )
            order.date = new Date();
            order.number = '12GDY7123';
            order.items = [];
            await this.orderService.post(order);

            for (const item of model) {
                let product = await this.productService.getById(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            }
            return new ResultDto('', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Erro ao processar requisição', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

}