import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from './app.controller';
import AppService from './app.service';
import UsersModule from './users/users.module';
import User from './users/entities/user.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3310,
      username: 'root',
      password: 'wagora',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export default class AppModule {}
