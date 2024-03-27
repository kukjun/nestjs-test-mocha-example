import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import AppModule from '../../src/app.module';

describe('User Integration Test', () => {
  let app;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  after(async () => {
    await app.close();
  });

  it('GET /users', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });
});
