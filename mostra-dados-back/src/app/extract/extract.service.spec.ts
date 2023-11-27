import { Test, TestingModule } from '@nestjs/testing';
import { ExtractService } from './extract.service';

describe('Extract', () => {
  let service: ExtractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractService],
    }).compile();

    service = module.get<ExtractService>(ExtractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
