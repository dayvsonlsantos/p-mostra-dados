import { Controller, Get, Query } from '@nestjs/common';
import { ExtractService } from './extract.service';
import { ExtractsEntity } from './extract.entity';
import { UserOptions } from '../interface/user-options';
// import { UserOptions } from '../interface/user-options';

@Controller('extracts')
export class ExtractController {
    constructor(
        private readonly extractsService: ExtractService
    ) { }

    @Get()
    async findAllExtracts(): Promise<ExtractsEntity[]> {
        return this.extractsService.findAllExtracts();
    }

    @Get('/getQuery')
    async getQuery(@Query() userOptions: UserOptions): Promise<any> {
        const result = await this.extractsService.getQuery(userOptions);
        return result;
    }

    @Get('/getExtractColumns')
    async getColumns() {
        return await this.extractsService.getExtractColumns();
    }

    @Get('/getDocTypes')
    async getDocTypes(): Promise<ExtractsEntity[]> {
        return this.extractsService.getDocTypes();
    }
}
