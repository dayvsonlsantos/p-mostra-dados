import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { DataEntity } from '../data/data.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    async findAllUsers(): Promise<UsersEntity[]> {
        return this.usersService.findAllUsers();
    }

    @Get('/getUsers')
    async getUsers(): Promise<UsersEntity[]> {
        return this.usersService.getUsers();
    }

    @Get('/getUsersColumns')
    async getColumns() {
        return await this.usersService.getUsersColumns();
    }

    @Get('/getSegments')
    async getSegments(): Promise<UsersEntity[]> {
        return this.usersService.getSegments();
    }

    @Post('/createData')
    async createData(@Body() data: DataEntity): Promise<DataEntity> {
        return this.usersService.createData(data);
    }
}
