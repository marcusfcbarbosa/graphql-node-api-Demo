import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './3-entities/product.entity';
import { Order } from './3-entities/order.entity';
import { OrderItem } from './3-entities/order-item.entity';
import { ProductService } from './4-services/product.service';
import { OrderService } from './4-services/order.service';
import { OrderItemService } from './4-services/order-item.service';
import { ProductController } from './1-controllers/product.controller';
import { OrderController } from './1-controllers/order.controller';

@Module({
    imports:
        [
            TypeOrmModule.forFeature([Product, Order, OrderItem]),
        ],
    providers: [
        ProductService,
        OrderService,
        OrderItemService
    ],
    controllers: [
        ProductController,
        OrderController
    ],
})
export class StoreModuleModule { }
