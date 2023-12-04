import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { DataEntity } from '../data/data.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        @InjectRepository(DataEntity) // Inject DataEntity repository
        private readonly dataRepository: Repository<DataEntity>,
    ) { }

    async createUser(name: string, segment: string): Promise<UsersEntity> {
        const newUser = this.usersRepository.create({ name, segment });
        return this.usersRepository.save(newUser);
    }

    async findAllUsers(): Promise<UsersEntity[]>{
        return this.usersRepository.createQueryBuilder('users').getMany()
    }

    async getUsers(): Promise<UsersEntity[]>{
        return await this.usersRepository
            .createQueryBuilder('users')
            .select('INITCAP(name) as column_name')
            .groupBy('users.name')
            .getRawMany();
    }

    async getSegments(): Promise<UsersEntity[]>{
        return await this.usersRepository
            .createQueryBuilder('users')
            .select('INITCAP(segment) as column_name')
            .groupBy('users.segment')
            .getRawMany();
    }

    async getUsersColumns(): Promise<string[]> {
        return this.usersRepository
            .createQueryBuilder()
            .select('column_name')
            .from('information_schema.columns', 'isc')
            .where('table_schema = :tableSchema', { tableSchema: 'public' })
            .andWhere('table_name = :tableOption', { tableOption: 'users' })
            .groupBy('column_name')
            .getRawMany();
    }

    async createData(data: DataEntity): Promise<DataEntity> {
        const newData = this.dataRepository.create(data);
        return this.dataRepository.save(newData);
    }
}
