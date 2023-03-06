import { Test, TestingModule } from '@nestjs/testing';
import { DspeechService } from './dspeech.service';

describe('DspeechService', () => {
  let service: DspeechService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DspeechService],
    }).compile();

    service = module.get<DspeechService>(DspeechService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
