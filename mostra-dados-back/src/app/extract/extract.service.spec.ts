// Comando para rodar o teste: npx jest --testPathPattern=src/app/extract/extract.service.spec.ts

// Importanto classes e funções para o teste
import { Test, TestingModule } from '@nestjs/testing';
import { ExtractService } from './extract.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExtractsEntity } from './extract.entity';
import { Repository } from 'typeorm';

// Describe -> Define um conjunto de testes para o serviço Extract.

// Esse teste garante que o serviço ExtractService funcione corretamente. Especificamente, 
// queremos garantir que ele seja capaz de se comunicar com o repositório de dados corretamente, 
// realizar operações de leitura e escrita, manipular dados conforme necessário e retornar os 
// resultados esperados.
describe('ExtractService', () => {
  let service: ExtractService;
  let repository: Repository<ExtractsEntity>;

  //beforeEach é executada antes de cada teste dentro do describe.
  //Garante que um certo conjunto de passos seja executado antes de cada teste ser rodado
  beforeEach(async () => {

    // Criando um módulo de teste usando o TestingModule que
    // nos permite configurar um ambiente isolado para testar o nosso serviço.
    const module: TestingModule = await Test.createTestingModule({
      // Estamos dizendo ao módulo de teste quais serviços devem estar disponíveis durante o teste
      providers: [
        ExtractService,
        {
          provide: getRepositoryToken(ExtractsEntity),
          useClass: Repository, // Mock Repository class
        },
      ],
    }).compile();

    // Obtendo instâncias reais do serviço ExtractService e do repositório simulado
    service = module.get<ExtractService>(ExtractService);
    repository = module.get<Repository<ExtractsEntity>>(
      getRepositoryToken(ExtractsEntity),
    );
  });






  // Verifica se o método findAllExtracts do serviço ExtractService 
  // retorna todos os extratos corretamente.
  describe('findAllExtracts', () => {
    it('should fetch all extracts', async () => {
      // criando dados fictícios que representam extratos
      const mockExtracts = [{ id: 1, data: 'mock data' }]; // Mock data to return
      
      // Espia o método createQueryBuilder para quando o findAllExtracts chamar esse método 
      // para buscar os extratos no banco de dados, ele não irá realmente acessar o banco de dados real.
      //  Em vez disso, ele retornará os dados fictícios que criamos anteriormente.
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        getMany: jest.fn().mockResolvedValueOnce(mockExtracts),
      } as any);

      const result = await service.findAllExtracts();

      // Verifica se o resultado retornado pelo método findAllExtracts é igual aos dados fictícios
      //  que esperamos receber. Se o método estiver funcionando corretamente, ele deverá retornar 
      // os mesmos dados que fornecemos no mock.
      expect(result).toEqual(mockExtracts);
    });
  });






  // Verifica se o método getExtractColumns do serviço ExtractService 
  // retorna as colunas dos extratos corretamente.
  describe('getExtractColumns', () => {
    it('should return extract columns', async () => {
      const mockColumns = ['column1', 'column2']; 
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockColumns),
      } as any);

      const result = await service.getExtractColumns();
      expect(result).toEqual(mockColumns);
    });
  });





  
  // Este teste verifica se o método getDocTypes do serviço ExtractService
  //  retorna corretamente um array de instâncias da entidade ExtractsEntity.
  describe('getDocTypes', () => {
    it('should return an array of ExtractsEntity', async () => {

      // Definindo o resultado esperado do método getDocTypes, que é um array contendo duas instâncias
      //  da entidade ExtractsEntity. Estas são instâncias fictícias, criadas apenas para fins de teste.
      const expectedResult = [new ExtractsEntity(), new ExtractsEntity()]; 
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await service.getDocTypes();

      expect(result).toEqual(expectedResult);
    });
  });





  
  // Este teste verifica se o método getQuery do serviço ExtractService retorna 
  // o resultado esperado com base nas opções do usuário.
  describe('getQuery', () => {
    it('should return the expected result', async () => {
      // Mock de um objeto userOptions que contém opções simuladas que um usuário poderia fornecer.
      const userOptions = {
        timeGrouping: 'month',
        selectedOptions: ['pages_process', 'doc_type'],
        aggregate: 'sum',
        specificFilter: 'some specific filter',
        startDate: new Date(),
        endDate: new Date(),
      };

      // Mock definindo os resultado esperado que o método getQuery 
      // deveria retornar com base nas opções do usuário. 
      // Este é um resultado fictício, criado apenas para fins de teste.
      const expectedResult = [{ /* mock the expected result here */ }];
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await service.getQuery(userOptions);

      expect(result).toEqual(expectedResult);
    });
  });

});

