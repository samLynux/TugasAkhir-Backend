import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { Product } from 'src/product/models/product.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { UserPreference } from './models/user-preferences.entity';
import { User } from './models/user.entity';
import { UserPreferencesService } from './user-preferences.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, UserPreference, Product]),
    CommonModule,
    AuthModule,
    ProductModule
  ],
  controllers: [UserController],
  providers: [UserService, UserPreferencesService, ProductService],
  exports: [UserService]
})
export class UserModule {}
