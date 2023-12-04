import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from '../data/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, DataEntity])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
