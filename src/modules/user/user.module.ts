import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSecurity } from 'src/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserSecurity])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [
        UserService
    ]
})
export class UserModule { }