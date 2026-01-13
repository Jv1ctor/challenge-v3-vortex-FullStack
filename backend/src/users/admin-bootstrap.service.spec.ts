import { Test, TestingModule } from '@nestjs/testing';
import { AdminBootstrapService } from './admin-bootstrap.service';

describe('AdminBootstrapService', () => {
  let service: AdminBootstrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminBootstrapService],
    }).compile();

    service = module.get<AdminBootstrapService>(AdminBootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
