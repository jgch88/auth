import UserService from './UserService';

const stubRepository = {
  // mocking that api works, not api works correctly (that's for the repository's test)
  getUser(username) {
    return {
      username,
      password: '1234',
    };
  },
};

const userService = new UserService(stubRepository);

describe('UserService', () => {
  it('returns a user value object using getUser', async () => {
    const user = await userService.getUserCredentials('user1');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
  });
});
