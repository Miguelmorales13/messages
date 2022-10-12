import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseMessagesService } from './firebase-messages.service';

describe('FirebaseMessagesService', () => {
  let service: FirebaseMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseMessagesService],
    }).compile();

    service = module.get<FirebaseMessagesService>(FirebaseMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
