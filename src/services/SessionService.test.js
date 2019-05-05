import SessionService from './SessionService';

const user = {
  username: 'user1',
  password: '1234',
};

let sessionService;

beforeEach(() => {
  sessionService = new SessionService();
});


describe('SessionService', () => {
  it('retrieves an array of logged in users', () => {
    expect(sessionService.users).toEqual([]);
  });

  it('stores user sessions', () => {
    sessionService.addUser(user);
    expect(sessionService.users).toEqual(expect.arrayContaining([user.username]));
  });

  it('creates a cookie for added users', () => {
    sessionService.addUser(user);
    const cookie = sessionService.getCookie(user);
    expect(cookie).toBeDefined();
  });
});
