import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, MysqlModule, UserModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppCronService } from './app.cron.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ScheduleModule.forRoot(),
    MysqlModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, AppCronService],
})
export class AppModule { }
