import Authenticator from '../Authenticator';
import UserService from '../services/UserService';
import InMemoryRepository from '../services/InMemoryRepository';

let authenticator;
let userService;
let inMemoryRepository;

const user1 = {
  username: 'user1',
  password: '1234',
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
  inMemoryRepository = new InMemoryRepository();
  userService = new UserService(inMemoryRepository);
  authenticator = new Authenticator(userService);

  inMemoryRepository.addUser(user1);
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
