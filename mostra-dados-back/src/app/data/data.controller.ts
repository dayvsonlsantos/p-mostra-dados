import { Body, Controller, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { DataEntity } from './data.entity';
import { DataOptions } from '../interface/user-options';

@Controller('data')
export class DataController {
    constructor(
        private readonly dataService: DataService
    ) { }

    @Post('/favorite')
    async createFavorite(@Body() dataOptions: DataOptions, @Query() queryParams: any): Promise<DataEntity> {
        // Combine dataOptions e queryParams conforme necessário e passe para o serviço
        return this.dataService.createFavorite({ ...dataOptions, ...queryParams });
    }
}
