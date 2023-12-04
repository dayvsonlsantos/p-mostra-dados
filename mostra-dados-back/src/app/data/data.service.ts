import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataEntity } from './data.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class DataService {

    constructor(
        @InjectRepository(DataEntity)
        private readonly dataRepository: Repository<DataEntity>,
        private readonly usersRepository: Repository<UsersEntity>
    ) { }

    // data.service

    // data.service

    // data.service

    // data.service

    // data.service

async createFavorite(dataOptions: any): Promise<DataEntity> {
    try {
        // Certifique-se de que dataOptions.user_id é o ID válido de um usuário existente
        const user = await this.usersRepository.findOne(dataOptions.user_id);

        if (!user) {
            // Lidere com a situação em que o usuário não é encontrado
            throw new Error('Usuário não encontrado');
        }

        // Melhore a inserção de dados usando o método save
        const createdData = await this.dataRepository.save({
            ...dataOptions,
            user_id: user,
        });

        // Busque a entidade recém-criada usando o ID
        const newData = await this.dataRepository.findOne(createdData.id);

        if (!newData) {
            // Lidere com a situação em que a entidade recém-criada não pode ser encontrada
            throw new Error('Falha ao obter a entidade recém-criada.');
        }

        return newData;
    } catch (error) {
        // Lidere com erros durante a inserção
        throw new Error(`Falha ao criar favorito: ${error.message}`);
    }
}











}
