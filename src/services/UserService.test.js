// UserService single reason to change:
// it needs to 'get' different user properties

import UserService from './UserService';

const stubRepository = {
  // mocking that api works, not api works correctly (that's for the repository's test)
  getUser(username) {
    return {
      username,
      password: '1234',
    };
  },

  addUser() {

  },
};

const userService = new UserService(stubRepository);

const user1 = {
  username: 'user1',
  password: 'password1',
};

describe('UserService', () => {
  it('returns a user value object using getUser(userName)', async () => {
    const user = await userService.getUserCredentials(user1.username);
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
  });

  it('allows users to be added to repository via registerUser(newUser)', async () => {
    expect(async () => {
      await userService.registerUser(user1);
    }).not.toThrow();
  });
});
