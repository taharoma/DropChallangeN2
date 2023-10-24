import { expect } from 'chai';
import ArgonService from './argon';

describe('ArgonService', () => {
  it('should hash a password', async () => {
    const password = 'password123';
    const hashedPassword = await ArgonService.hashPassword(password);
    expect(hashedPassword).to.be.a('string');
  });

  it('should compare passwords', async () => {
    const password = 'password123';
    const hashedPassword = await ArgonService.hashPassword(password);

    const isMatch = await ArgonService.comparePassword(
      password,
      hashedPassword,
    );
    expect(isMatch).to.equal(true);
  });

  it('should detect incorrect passwords', async () => {
    const password = 'password123';
    const incorrectPassword = 'wrongpassword';

    const hashedPassword = await ArgonService.hashPassword(password);

    const isMatch = await ArgonService.comparePassword(
      incorrectPassword,
      hashedPassword,
    );
    expect(isMatch).to.equal(false);
  });
});
