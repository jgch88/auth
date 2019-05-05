import Authenticator from './Authenticator';

const testUserCredentials = {
  username: 'user1',
  password: 'user1password',
};

const loginAttempt = {
  username: 'user1',
  password: '2345',
};

const stubUserService = {
  // eslint-disable-next-line no-unused-vars
  getUserCredentials(username) {
    return testUserCredentials;
  },
};

const authenticator = new Authenticator(stubUserService);

describe('Authenticator', () => {
  it('validates a login attempt', async () => {
    const authenticated = await authenticator.verifyLogin(loginAttempt);
    expect(authenticated).toBe(false);
  });

  it('validates login attempts by comparing the login attempt with user credentials', async () => {
    let authenticated = await authenticator.verifyLogin(loginAttempt);
    expect(authenticated).toBe(false);

    authenticated = await authenticator.verifyLogin(testUserCredentials);
    expect(authenticated).toBe(true);
  });
});
