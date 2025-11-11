import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { PrismaModule } from '../prisma';
import { EventService } from './event.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get<string>('JWT_SECRET');
                if (!secret) throw new Error('JWT_SECRET is not defined');
                return {
                    secret,
                    signOptions: { expiresIn: '1h' },
                };
            },
        }),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads/events',
                filename: (req, file, cb) => {
                    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, unique + extname(file.originalname));
                },
            }),
        }),
        PrismaModule
    ],
    controllers: [EventController],
    providers: [EventService],
    exports: [
        EventService
    ]
})
export class EventModule { }