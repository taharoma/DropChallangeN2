import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { expect } from 'chai';

class JwtServiceMock {
  signAsync(payload: any): string {
    return 'mockedToken';
  }
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).to.be.ok;
  });

  it('should generate a token', async () => {
    const username = 'testUser';
    const token = await authService.generateToken(username);
    expect(token).to.equal('mockedToken');
  });
});
