import { Test, TestingModule } from '@nestjs/testing';
import { DevlogsService } from './devlogs.service';

describe('DevlogsService', () => {
  let service: DevlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevlogsService],
    }).compile();

    service = module.get<DevlogsService>(DevlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
