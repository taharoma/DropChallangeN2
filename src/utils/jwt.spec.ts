import { expect } from 'chai';
import { JwtService } from '@nestjs/jwt';
import { jwtService } from './jwt';

describe('jwtService', () => {
  it('should generate a JWT token', async () => {
    const jwtServiceInstance = new jwtService(
      new JwtService({ secret: 'Tfgfgv@!!yhk2152g434hgvk?jrf557' }),
    );

    const payload = { userId: 123, username: 'example' };
    const token = await jwtServiceInstance.generateToken(payload);

    expect(token).to.be.a('string');
  });
});
