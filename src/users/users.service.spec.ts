import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { before } from 'mocha';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import UsersService from './users.service';
import User from './entities/user.entity';
import CreateUserDto from './dto/create-user.dto';

describe('User Service Test', () => {
  const sandbox: SinonSandbox = createSandbox();
  let testApp: TestingModule;
  let service: UsersService;
  let repository: Repository<User>;

  before(async () => {
    testApp = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository<User>, // Use the actual Repository class here
        },
      ],
    }).compile();
    service = testApp.get(UsersService);
    repository = testApp.get(getRepositoryToken(User));
  });

  beforeEach(() => {
    sandbox.restore();
  });

  describe('#create()', () => {
    let createStub: SinonStub;
    beforeEach(() => {
      createStub = sandbox.stub(repository, 'save');
    });
    afterEach(() => {
      sandbox.restore();
    });

    describe('DTO의 name, description 중 빈 값이 없으면', () => {
      it('성공', async () => {
        // given
        // DTO 생성
        const dto: CreateUserDto = {
          name: '테스트 이름',
          description: '테스트 설명',
        };
        // 함수 Stub
        const expectUUID = '6ed08e0f-e134-4c37-9001-478225f15ae5';
        createStub.callsFake(() =>
          Promise.resolve({
            id: expectUUID,
            name: dto.name,
            description: dto.description,
          }),
        );

        // when
        const result = await service.create(dto);

        // then
        // BDD 방식의 두가지 작성 방법 should, expect 중 expect 채택
        expect(result).to.equals(expectUUID);
        expect(createStub.calledOnce).to.equals(true);
      });
    });

    describe('DTO의 name이 비어 있으면', () => {
      it('예외발생', async () => {
        // given
        // DTO 생성
        const dto: CreateUserDto = {
          name: null,
          description: '테스트 설명',
        };
        // 함수 Stub
        createStub.throws(new Error('Test Fail'));

        // when
        try {
          await service.create(dto);
          Error('Error Not Caught');
        } catch (error) {
          // then
          expect(error.message).to.equals('Test Fail');
        }
      });
    });
  });
});
