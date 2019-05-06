import Authenticator from '../Authenticator';
import UserService from '../services/UserService';
import InMemoryRepository from '../services/InMemoryRepository';
import SessionService from '../services/SessionService';
import IdGenerator from '../utils/IdGenerator';

let authenticator;
let userService;
let inMemoryRepository;
let idGenerator;
let sessionService;

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
  idGenerator = new IdGenerator();
  sessionService = new SessionService(idGenerator);
});

describe('Integration', () => {
  describe('Authenticator, UserService, SessionService collaboration', () => {
    it('authenticates a user log in attempt correctly', async () => {
      await userService.registerUser(user1);

      let authenticated = await authenticator.verifyLogin(invalidLoginAttempt);
      expect(authenticated).toBe(false);

      authenticated = await authenticator.verifyLogin(validLoginAttempt);
      expect(authenticated).toBe(true);
    });

    it('registering a new user allows the user credentials to be retrieved', async () => {
      let userCredentials;
      let errorMessage;
      // async/await toThrow not working as expected in jest
      try {
        userCredentials = await userService.getUserCredentials(user1.username);
      } catch (e) {
        errorMessage = e.message;
      }
      expect(errorMessage).toBe(`Username ${user1.username} not found.`);
      errorMessage = null;

      await userService.registerUser(user1);
      try {
        userCredentials = await userService.getUserCredentials(user1.username);
      } catch (e) {
        errorMessage = e.message;
      }
      expect(userCredentials).toEqual(user1);
      expect(errorMessage).toBe(null);
    });
  });

  describe('SessionService, IdGenerator collaboration', () => {
    it('session service delegates session id generation to IdGenerator', () => {
      const newSessionId = sessionService.createSession(user1);
      // console.log(sessionService.sessions);
      expect(sessionService.verifySession(newSessionId)).toEqual(user1.username);
    });
  });
});
