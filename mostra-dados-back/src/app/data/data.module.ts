import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataEntity } from './data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity])],
  providers: [DataService],
  controllers: [DataController]
})
export class DataModule {}
