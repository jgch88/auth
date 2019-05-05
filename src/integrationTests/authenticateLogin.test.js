import Authenticator from '../Authenticator';
import UserService from '../services/UserService';

let authenticator;
let userService;

const stubRepository = {
  getUser(username) {
    return {
      username,
      password: '1234',
    };
  },
};

const invalidLoginAttempt = {
  username: 'user1',
  password: '2345',
};

const validLoginAttempt = {
  username: 'user1',
  password: '1234',
};

beforeEach(() => {
  userService = new UserService(stubRepository);
  authenticator = new Authenticator(userService);
});

describe('Integration', () => {
  describe('Authenticator, UserService, SessionService collaboration', () => {
    it('authenticates a user log in attempt correctly', async () => {
      let authenticated = await authenticator.verifyLogin(invalidLoginAttempt);
      expect(authenticated).toBe(false);

      authenticated = await authenticator.verifyLogin(validLoginAttempt);
      expect(authenticated).toBe(true);
    });
  });
});
