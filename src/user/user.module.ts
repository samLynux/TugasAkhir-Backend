import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { Brand } from 'src/common/models/brand.entity';
import { Category } from 'src/common/models/category.entity';
import { Color } from 'src/common/models/color.entity';
import { Size } from 'src/common/models/size.entity';
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
    TypeOrmModule.forFeature([User, UserPreference, Product, Category, Color, Size, Brand]),
    CommonModule,
    AuthModule,
    ProductModule
  ],
  controllers: [UserController],
  providers: [UserService, UserPreferencesService, ProductService],
  exports: [UserService]
})
export class UserModule {}
