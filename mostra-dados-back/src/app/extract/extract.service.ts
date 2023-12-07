import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractsEntity } from './extract.entity';
import { Repository } from 'typeorm';
// import { UserOptions } from '../interface/user-options';
// import { UserOptions } from '../interface/user-options';

@Injectable()
export class ExtractService {
    constructor(
        @InjectRepository(ExtractsEntity)
        private readonly extractsRepository: Repository<ExtractsEntity>
    ) { }

    async findAllExtracts(): Promise<ExtractsEntity[]> {
        return this.extractsRepository.createQueryBuilder('extracts').getMany()
    }

    async getExtractColumns(): Promise<string[]> {
        return this.extractsRepository
            .createQueryBuilder()
            .select('column_name')
            .from('information_schema.columns', 'isc')
            .where('table_schema = :tableSchema', { tableSchema: 'public' })
            .andWhere('table_name = :tableOption', { tableOption: 'extracts' })
            .groupBy('column_name')
            .getRawMany();
    }

    async getDocTypes(): Promise<ExtractsEntity[]> {
        return await this.extractsRepository
            .createQueryBuilder('extracts')
            .select(
                [
                    `CASE
                        WHEN extracts.doc_type = 'CNH' THEN UPPER(extracts.doc_type)
                        WHEN extracts.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(extracts.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
                        WHEN extracts.doc_type = 'FATURA_ENERGIA' THEN REPLACE(extracts.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
                        WHEN extracts.doc_type = 'DECLARACAO_IR' THEN REPLACE(extracts.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
                        WHEN extracts.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(extracts.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
                        WHEN extracts.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(extracts.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
                        ELSE REPLACE(INITCAP(extracts.doc_type), '_', ' ')
                    END AS column_name`
                ]
            )
            .groupBy('extracts.doc_type')
            .getRawMany();
    }

    async getQuery(userOptions: any): Promise<any> {

        let datePattern = 'MM/YY';

        switch (userOptions.timeGrouping) {
            case 'day':
                datePattern = 'DD/MM/YY';
                break;
            case 'month':
                datePattern = 'MM/YY';
                break;
            case 'year':
                datePattern = 'YY';
                break;
        }

        console.log(userOptions.selectedOptions);

        const queryBuilder = this.extractsRepository.createQueryBuilder('e');


        // switch (true) {
        //     case userOptions.selectedOptions.includes('pages_process'):
        //         if (
        //             userOptions.selectedOptions.includes('doc_type') &&
        //             userOptions.aggregate === 'sum'
        //         ) {
        //             const result = await queryBuilder
        //                 .select(['SUM(e.pages_process) as "Páginas Processadas"'])
        //                 .addSelect([`
        //                     CASE
        //                         WHEN e.doc_type = 'CNH' THEN UPPER(e.doc_type)
        //                         WHEN e.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(e.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
        //                         WHEN e.doc_type = 'FATURA_ENERGIA' THEN REPLACE(e.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
        //                         WHEN e.doc_type = 'DECLARACAO_IR' THEN REPLACE(e.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
        //                         WHEN e.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(e.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
        //                         WHEN e.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(e.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
        //                         ELSE REPLACE(INITCAP(e.doc_type), '_', ' ')
        //                     END AS "Tipo de Documento"
        //                 `])
        //                 .innerJoin('users', 'u', 'u.id = e.user_id')
        //                 .where(
        //                     `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
        //                     {
        //                         startDate: userOptions.startDate,
        //                         endDate: userOptions.endDate,
        //                     },
        //                 )
        //                 .groupBy('e.doc_type')
        //                 .getRawMany();

        //             return result;
        //         }
        //         break;
        //     case userOptions.selectedOptions.includes('doc_count'):
        //         if (
        //             userOptions.selectedOptions.includes('name') &&
        //             userOptions.aggregate === ''
        //         ) {
        //             const result = await queryBuilder
        //                 .select(['count(e.doc_type) AS "Documentos processados"'])
        //                 .addSelect(['u.name AS "Usuário"'])
        //                 .innerJoin('users', 'u', 'u.id = e.user_id')
        //                 .where(
        //                     `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
        //                     {
        //                         startDate: userOptions.startDate,
        //                         endDate: userOptions.endDate,
        //                     },
        //                 )
        //                 .groupBy('u.name')
        //                 .getRawMany();

        //             return result;
        //         }
        //         break;

        // Selecting two columns

        if (
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.selectedOptions.includes('doc_type') &&
            userOptions.aggregate === 'sum'
        ) {
            const result = await queryBuilder
                .select(['SUM(e.pages_process) as "Páginas Processadas"'])
                .addSelect([`
                        CASE
                            WHEN e.doc_type = 'CNH' THEN UPPER(e.doc_type)
                            WHEN e.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(e.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
                            WHEN e.doc_type = 'FATURA_ENERGIA' THEN REPLACE(e.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
                            WHEN e.doc_type = 'DECLARACAO_IR' THEN REPLACE(e.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
                            WHEN e.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(e.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
                            WHEN e.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(e.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
                            ELSE REPLACE(INITCAP(e.doc_type), '_', ' ')
                        END AS "Tipo de Documento"
                    `])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('e.doc_type')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.selectedOptions.includes('doc_type') &&
            userOptions.aggregate === 'avg'
        ) {
            const result = await queryBuilder
                .select(['ROUND(avg(e.pages_process),2) as "Páginas Processadas"'])
                .addSelect([`
                        CASE
                            WHEN e.doc_type = 'CNH' THEN UPPER(e.doc_type)
                            WHEN e.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(e.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
                            WHEN e.doc_type = 'FATURA_ENERGIA' THEN REPLACE(e.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
                            WHEN e.doc_type = 'DECLARACAO_IR' THEN REPLACE(e.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
                            WHEN e.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(e.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
                            WHEN e.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(e.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
                            ELSE REPLACE(INITCAP(e.doc_type), '_', ' ')
                        END AS "Tipo de Documento"
                    `])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('e.doc_type')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.selectedOptions.includes('name') &&
            userOptions.aggregate === 'sum'
        ) {
            const result = await queryBuilder
                .select(['sum(e.pages_process) AS "Páginas Processadas"'])
                .addSelect(['u.name AS "Usuário"'])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('u.name')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.selectedOptions.includes('name') &&
            userOptions.aggregate === 'avg'
        ) {
            const result = await queryBuilder
                .select(['ROUND(avg(e.pages_process),2) AS "Páginas Processadas"'])
                .addSelect(['u.name AS "Usuário"'])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('u.name')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.selectedOptions.includes('segment') &&
            userOptions.aggregate === 'sum'
        ) {
            const result = await queryBuilder
                .select(['sum(e.pages_process) AS "Páginas Processadas"'])
                .addSelect([`
                    CASE
                        WHEN u.segment = 'imobiliaria' THEN REPLACE (u.segment, 'imobiliaria', 'Imobiliária')
                        WHEN u.segment = 'construtora' THEN INITCAP (u.segment)
                        WHEN u.segment = 'financeira' THEN INITCAP (u.segment)
                        WHEN u.segment = 'banco' THEN INITCAP (u.segment)
                        ELSE INITCAP(u.segment)
                    END AS "Segmento"
                `])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('u.segment')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.selectedOptions.includes('segment') &&
            userOptions.aggregate === 'avg'
        ) {
            const result = await queryBuilder
                .select(['ROUND(avg(e.pages_process),2) AS "Páginas Processadas"'])
                .addSelect([`
                    CASE
                        WHEN u.segment = 'imobiliaria' THEN REPLACE (u.segment, 'imobiliaria', 'Imobiliária')
                        WHEN u.segment = 'construtora' THEN INITCAP (u.segment)
                        WHEN u.segment = 'financeira' THEN INITCAP (u.segment)
                        WHEN u.segment = 'banco' THEN INITCAP (u.segment)
                        ELSE INITCAP(u.segment)
                    END AS "Segmento"
                `])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('u.segment')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('doc_count') &&
            userOptions.selectedOptions.includes('name') &&
            userOptions.aggregate === ''
        ) {
            const result = await queryBuilder
                .select(['count(e.doc_type) AS "Documentos processados"'])
                .addSelect(['u.name AS "Usuário"'])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('u.name')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('doc_count') &&
            userOptions.selectedOptions.includes('segment') &&
            userOptions.aggregate === ''
        ) {
            const result = await queryBuilder
                .select(['count(e.doc_type) AS "Documentos processados"'])
                .addSelect([`
                    CASE
                        WHEN u.segment = 'imobiliaria' THEN REPLACE (u.segment, 'imobiliaria', 'Imobiliária')
                        WHEN u.segment = 'construtora' THEN INITCAP (u.segment)
                        WHEN u.segment = 'financeira' THEN INITCAP (u.segment)
                        WHEN u.segment = 'banco' THEN INITCAP (u.segment)
                        ELSE INITCAP(u.segment)
                    END AS "Segmento"
                `])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('u.segment')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('doc_count') &&
            userOptions.selectedOptions.includes('doc_type') &&
            userOptions.aggregate === ''
        ) {
            const result = await queryBuilder
                .select(['count(e.doc_type) AS "Documentos processados"'])
                .addSelect([`
                    CASE
                        WHEN e.doc_type = 'CNH' THEN UPPER(e.doc_type)
                        WHEN e.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(e.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
                        WHEN e.doc_type = 'FATURA_ENERGIA' THEN REPLACE(e.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
                        WHEN e.doc_type = 'DECLARACAO_IR' THEN REPLACE(e.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
                        WHEN e.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(e.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
                        WHEN e.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(e.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
                        ELSE REPLACE(INITCAP(e.doc_type), '_', ' ')
                    END AS "Tipo de Documento"
                `])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy('e.doc_type')
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('created_at') &&
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.aggregate === 'sum'
        ) {
            const result = await queryBuilder
                .select([`TO_CHAR(DATE_TRUNC('${userOptions.timeGrouping}', e.created_at), '${datePattern}') AS "Data de Criação"`])
                .addSelect([`SUM(e.pages_process) AS "Páginas Acumulativas"`])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy(`DATE_TRUNC('${userOptions.timeGrouping}', e.created_at)`)
                .orderBy(`DATE_TRUNC('${userOptions.timeGrouping}', e.created_at)`)
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('created_at') &&
            userOptions.selectedOptions.includes('pages_process') &&
            userOptions.aggregate === 'avg'
        ) {
            const result = await queryBuilder
                .select([`TO_CHAR(DATE_TRUNC('${userOptions.timeGrouping}', e.created_at), '${datePattern}') AS "Data de Criação"`])
                .addSelect([`ROUND(avg(e.pages_process),2) AS "Páginas Acumulativas"`])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy(`DATE_TRUNC('${userOptions.timeGrouping}', e.created_at)`)
                .orderBy(`DATE_TRUNC('${userOptions.timeGrouping}', e.created_at)`)
                .getRawMany();

            return result;
        } else if (
            userOptions.selectedOptions.includes('created_at') &&
            userOptions.selectedOptions.includes('doc_count') &&
            userOptions.aggregate === ''
        ) {
            const result = await queryBuilder
                .select([`TO_CHAR(DATE_TRUNC('${userOptions.timeGrouping}', e.created_at), '${datePattern}') AS "Data de Criação"`])
                .addSelect([`COUNT(e.doc_type) AS "Páginas Acumulativas"`])
                .innerJoin('users', 'u', 'u.id = e.user_id')
                .where(
                    `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                    {
                        startDate: userOptions.startDate,
                        endDate: userOptions.endDate,
                    },
                )
                .groupBy(`DATE_TRUNC('${userOptions.timeGrouping}', e.created_at)`)
                .orderBy(`DATE_TRUNC('${userOptions.timeGrouping}', e.created_at)`)
                .getRawMany();

            return result;
        }

        // Selecting one option
        console.log(userOptions);


        switch (true) {
            case userOptions.selectedOptions.includes('only_doc_count'):
                if (
                    userOptions.aggregate === ''
                ) {
                    const result = await queryBuilder
                        .select(['count(e.doc_type) AS "Documentos processados"'])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('only_pages_process'):
                if (
                    userOptions.aggregate === 'sum'
                ) {
                    const result = await queryBuilder
                        .select(['sum(e.pages_process) AS "Páginas Processadas"'])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('only_pages_process'):
                if (
                    userOptions.aggregate === 'avg'
                ) {
                    const result = await queryBuilder
                        .select(['ROUND(avg(e.pages_process),2) AS "Páginas Processadas"'])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('doc_most_analyzed_pages'):
                if (
                    userOptions.aggregate === 'sum'
                ) {
                    const result = await queryBuilder
                        .select(['sum(e.pages_process)'])
                        .addSelect([`
                    CASE
                        WHEN e.doc_type = 'CNH' THEN UPPER(e.doc_type)
                        WHEN e.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(e.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
                        WHEN e.doc_type = 'FATURA_ENERGIA' THEN REPLACE(e.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
                        WHEN e.doc_type = 'DECLARACAO_IR' THEN REPLACE(e.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
                        WHEN e.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(e.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
                        WHEN e.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(e.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
                        ELSE REPLACE(INITCAP(e.doc_type), '_', ' ')
                    END AS "Tipo de Documento"
                `])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .groupBy('e.doc_type')
                        .orderBy('sum(e.pages_process)', 'DESC')
                        .limit(1)
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('user_most_analyzed_doc'):
                if (
                    userOptions.aggregate === ''
                ) {
                    const result = await queryBuilder
                        .select(['u.name AS "Usuário"'])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .groupBy('u.name')
                        .orderBy('count(e.doc_type)', 'DESC')
                        .limit(1)
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('user_most_analyzed_pages'):
                if (
                    userOptions.aggregate === 'sum'
                ) {
                    const result = await queryBuilder
                        .select(['u.name AS "Usuário"'])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .groupBy('u.name')
                        .orderBy('sum(e.pages_process)', 'DESC')
                        .limit(1)
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('segment_most_analyzed_doc'):
                if (
                    userOptions.aggregate === ''
                ) {
                    const result = await queryBuilder
                        .select([`
                    CASE
                        WHEN u.segment = 'imobiliaria' THEN REPLACE (u.segment, 'imobiliaria', 'Imobiliária')
                        WHEN u.segment = 'construtora' THEN INITCAP (u.segment)
                        WHEN u.segment = 'financeira' THEN INITCAP (u.segment)
                        WHEN u.segment = 'banco' THEN INITCAP (u.segment)
                        ELSE INITCAP(u.segment)
                    END AS "Segmento"
                `])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .groupBy('u.segment')
                        .orderBy('count(e.doc_type)', 'DESC')
                        .limit(1)
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('segment_most_analyzed_pages'):
                if (
                    userOptions.aggregate === 'sum'
                ) {
                    const result = await queryBuilder
                        .select([`
                    CASE
                        WHEN u.segment = 'imobiliaria' THEN REPLACE (u.segment, 'imobiliaria', 'Imobiliária')
                        WHEN u.segment = 'construtora' THEN INITCAP (u.segment)
                        WHEN u.segment = 'financeira' THEN INITCAP (u.segment)
                        WHEN u.segment = 'banco' THEN INITCAP (u.segment)
                        ELSE INITCAP(u.segment)
                    END AS "Segmento"
                `])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .groupBy('u.segment')
                        .orderBy('sum(e.pages_process)', 'DESC')
                        .limit(1)
                        .getRawMany();

                    return result;
                }
                break;
            case userOptions.selectedOptions.includes('most_analyzed_doc'):
                if (
                    userOptions.aggregate === ''
                ) {
                    const result = await queryBuilder
                        .select([`
                    CASE
                        WHEN e.doc_type = 'CNH' THEN UPPER(e.doc_type)
                        WHEN e.doc_type = 'POSICAO_CONSOLIDADA' THEN REPLACE(e.doc_type, 'POSICAO_CONSOLIDADA', 'Posição Consolidada')
                        WHEN e.doc_type = 'FATURA_ENERGIA' THEN REPLACE(e.doc_type, 'FATURA_ENERGIA', 'Fatura de Energia')
                        WHEN e.doc_type = 'DECLARACAO_IR' THEN REPLACE(e.doc_type, 'DECLARACAO_IR', 'Declaração de Imposto de Renda')
                        WHEN e.doc_type = 'COMPROVANTE_RESIDENCIA' THEN REPLACE(e.doc_type, 'COMPROVANTE_RESIDENCIA', 'Comprovante de Residência')
                        WHEN e.doc_type = 'BALANCO_PATRIMONIAL' THEN REPLACE(e.doc_type, 'BALANCO_PATRIMONIAL', 'Balanço Patrimonial')
                        ELSE REPLACE(INITCAP(e.doc_type), '_', ' ')
                    END AS "Tipo de Documento"
                `])
                        .innerJoin('users', 'u', 'u.id = e.user_id')
                        .where(
                            `(e.created_at >= :startDate AND e.created_at <= :endDate) AND ${userOptions.specificFilter}`,
                            {
                                startDate: userOptions.startDate,
                                endDate: userOptions.endDate,
                            },
                        )
                        .groupBy('e.doc_type')
                        .orderBy('count(e.doc_type)')
                        .limit(1)
                        .getRawMany();

                    return result;
                }
                break;
        }
    }
}
