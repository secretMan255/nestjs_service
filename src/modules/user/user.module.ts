import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User, UserSecurity } from 'src/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PermissionsGuard } from 'src/guard/permission/permissions.guard';
import { PrismaModule } from '../prisma';

@Module({
    imports: [
        PrismaModule
        // TypeOrmModule.forFeature([User, UserSecurity])
    ],
    controllers: [UserController],
    providers: [UserService, PermissionsGuard],
    exports: [
        UserService
    ]
})
export class UserModule { }