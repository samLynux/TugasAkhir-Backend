import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CommonModule } from 'src/common/common.module';
import { Product } from 'src/product/models/product.entity';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/models/user.entity';
import { OrderItem } from './models/order-item.entity';
import { OrderItemsService } from './order-items.service';
import { OrderController } from './order.controller';
import { Order } from './models/order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order,OrderItem, User, Product]),

  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemsService, AuthService, ProductService]
})
export class OrderModule {}
