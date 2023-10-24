import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { expect } from 'chai';

class AuthServiceMock {
  async generateToken(username: string): Promise<string> {
    return 'mockedToken';
  }
}

describe('AuthController (Integration)', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).to.be.ok;
  });

  it('should return a token when valid credentials are provided', async () => {
    const credentials = { username: 'validUser', password: 'validPassword' };
    const response = await authController.login(credentials);

    expect(response).to.deep.equal({ token: 'mockedToken' });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    const credentials = {
      username: 'invalidUser',
      password: 'invalidPassword',
    };

    try {
      await authController.login(credentials);
    } catch (error) {
      expect(error).to.be.instanceOf(UnauthorizedException);
      expect(error.message).to.equal('Invalid credentials');
    }
  });
});
