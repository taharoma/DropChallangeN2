import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';
import { SinonSpy, createSandbox } from 'sinon';
import { expect } from 'chai';

describe('UsersService Integration Test', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let createUserSpy: SinonSpy;
  let findOneEmailSpy: SinonSpy;
  let sandbox;

  before(async () => {
    sandbox = createSandbox();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = app.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    createUserSpy = sandbox.spy(usersService, 'create');
  });

  after(() => {
    sandbox.restore();
  });

  describe('UsersService', () => {
    it('should create a user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'avatar-url',
        password: 'asda@S2313',
        role: 'CLIENT', // Replace with a valid role
        token: 'test_token',
      };

      const createdUser = await usersService.create(createUserDto);

      expect(createUserSpy.calledWith(createUserDto)).to.be.true;
      expect(createdUser).to.exist;
    });
  });
});
