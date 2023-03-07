import { Test, TestingModule } from '@nestjs/testing';
import { LmrService } from './lmr.service';

describe('LmrService', () => {
  let service: LmrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LmrService],
    }).compile();

    service = module.get<LmrService>(LmrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
