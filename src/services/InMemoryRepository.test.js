import InMemoryRepository from './InMemoryRepository';

let inMemoryRepository;

beforeEach(() => {
  inMemoryRepository = new InMemoryRepository();
});

const user1 = {
  username: 'user1',
  password: 'password1',
};

const user2 = {
  username: 'user2',
  password: 'password2',
};

describe('Repository', () => {
  describe('in memory implementation', () => {
    it('can store and retrieve users', () => {
      inMemoryRepository.addUser(user1);
      let user = inMemoryRepository.getUser(user1.username);
      expect(user).toEqual(user1);

      user = inMemoryRepository.getUser('fakeUser');
      expect(user).toBe(undefined);
    });

    it('it stores unique usernames', () => {
      inMemoryRepository.addUser(user1);
      expect(() => {
        inMemoryRepository.addUser(user1);
      }).toThrow(`Username ${user1.username} already exists.`);
      expect(() => {
        inMemoryRepository.addUser(user2);
      }).not.toThrow();
    });
  });
});
