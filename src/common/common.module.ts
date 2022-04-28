import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './models/brand.entity';
import { Category } from './models/category.entity';
import { Size } from './models/size.entity';

@Module({
    imports: [
        JwtModule.register({
            secret: "secret",
            signOptions: { expiresIn: '1d' },
          }),
        TypeOrmModule.forFeature([Category, Size, Brand]),
    ],
    exports: [
        JwtModule
    ]
})
export class CommonModule {}
