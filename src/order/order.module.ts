import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CommonModule } from 'src/common/common.module';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import { OrderItem } from './order-item.entity';
import { OrderItemsService } from './order-items.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order,OrderItem, User]),

  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemsService, AuthService, UserService]
})
export class OrderModule {}
