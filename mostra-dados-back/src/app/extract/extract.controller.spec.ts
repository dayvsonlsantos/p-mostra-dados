import { Test, TestingModule } from '@nestjs/testing';
import { ExtractController } from './extract.controller';

describe('ExtractController', () => {
  let controller: ExtractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtractController],
    }).compile();

    controller = module.get<ExtractController>(ExtractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
