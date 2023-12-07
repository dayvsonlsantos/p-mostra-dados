import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
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

    async findAllUsers(): Promise<UsersEntity[]> {
        return this.usersRepository.createQueryBuilder('users').getMany()
    }

    async getUsers(): Promise<UsersEntity[]> {
        return await this.usersRepository
            .createQueryBuilder('users')
            .select('INITCAP(name) as column_name')
            .groupBy('users.name')
            .getRawMany();
    }

    async getSegments(): Promise<UsersEntity[]> {
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

    // async createOrUpdateData(data: DataEntity): Promise<DataEntity> {
    //     if (data.id) {
    //         // Se o ID está presente, trata-se de uma atualização
    //         const existingData = await this.dataRepository.findOne({ where: { id: data.id } });

    //         if (existingData) {
    //             // Atualiza os campos relevantes
    //             existingData.user_id = data.user_id;
    //             existingData.cardValueID = data.cardValueID;
    //             // ... atualize outros campos conforme necessário

    //             return this.dataRepository.save(existingData);
    //         }
    //     }

    //     // Se o ID não está presente ou não foi encontrado, trata-se de uma criação
    //     const newData = this.dataRepository.create(data);
    //     return this.dataRepository.save(newData);
    // }
    async createOrUpdateData(data: DataEntity): Promise<DataEntity> {
        // Verifica se já existe um registro com o mesmo cardValueID e user_id
        // console.log('data');
        // console.log(data);

        const cardValueID = data.cardValueID;
        const userID = Number(data.user_id);

        try {
            const existingData: DataEntity | undefined = await this.dataRepository.findOne({
                where: { cardValueID, user_id: { id: userID } },
                relations: ['user_id'],
            });

            // console.log('Testes:');
            // console.log(existingData);

            if (existingData) {
                // console.log(existingData.user_id);
                // console.log(existingData.user_id.id.toString());
                // console.log(userID.toString());

                if (existingData.user_id.id.toString() === userID.toString()) {
                    // Se o usuário existir, atualiza os campos
                    existingData.aggregate = data.aggregate;
                    existingData.chartType = data.chartType;
                    existingData.selectedOptions = data.selectedOptions;
                    existingData.startDate = data.startDate;
                    existingData.endDate = data.endDate;
                    existingData.timeGrouping = data.timeGrouping;
                    existingData.specificFilter = data.specificFilter;

                    // console.log('entrou no if');
                    // console.log(existingData);

                    return this.dataRepository.save(existingData);
                } else {
                    console.log('Usuário encontrado, mas IDs não correspondem.');
                }
            } else {
                // Se não existe, cria um novo registro
                const newData = this.dataRepository.create(data);
                // console.log('entrou no else');
                // console.log(newData);
                return this.dataRepository.save(newData);
            }
        } catch (error) {
            console.error('Erro ao buscar dados existentes:', error);
            // Trate o erro conforme necessário, dependendo da lógica do seu aplicativo
            throw error;
        }
    }




    async getUserData(userId: number): Promise<DataEntity[]> {
        const queryBuilder: SelectQueryBuilder<DataEntity> = this.dataRepository.createQueryBuilder('data');

        const result = await queryBuilder
            .where('data.user_id = :userId', { userId })
            .getRawMany();

        return result;
    }
}
