import { Module } from '@nestjs/common';
import { ExtractController } from './extract.controller';
import { ExtractService } from './extract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractsEntity } from './extract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExtractsEntity])],
  controllers: [ExtractController],
  providers: [ExtractService]
})
export class ExtractModule {}
