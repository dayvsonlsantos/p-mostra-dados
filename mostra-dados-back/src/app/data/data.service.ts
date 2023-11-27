import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataEntity } from './data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {

    constructor(
        @InjectRepository(DataEntity)
        private readonly dataRepository: Repository<DataEntity>
    ) { }

    
}
