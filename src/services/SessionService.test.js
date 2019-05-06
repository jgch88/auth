import SessionService from './SessionService';

// simple autoincrementing implementation for stub
const stubSessionIdGenerator = {
  count: -1,
  generateId() {
    this.count += 1;
    return this.count;
  },
  reset() {
    this.count = -1;
  },
};

const user = {
  username: 'user1',
  password: '1234',
};

const user2 = {
  username: 'user2',
  password: '2345',
};

let sessionService;

beforeEach(() => {
  stubSessionIdGenerator.reset();
  sessionService = new SessionService(stubSessionIdGenerator);
});


describe('SessionService', () => {
  it('can display a map of logged in sessions', () => {
    expect(sessionService.sessions).toEqual({});
    sessionService.createSession(user);
    sessionService.createSession(user2);

    expect(sessionService.sessions).toEqual({
      0: 'user1',
      1: 'user2',
    });
  });

  it('throws an error if user has already created a session', () => {
    sessionService.createSession(user);
    expect(() => {
      sessionService.createSession(user);
    }).toThrow('User session already exists.');
  });

  it('generates a sessionId when creating a new user session', () => {
    const newSessionId = sessionService.createSession(user);
    expect(newSessionId).toEqual(0);
  });

  it('verifies that a given sessionId exists and returns username for that session', () => {
    sessionService.createSession(user);

    expect(() => {
      sessionService.verifySession('fakeSessionId');
    }).toThrow('Session does not exist.');

    const username = sessionService.verifySession(0);
    expect(username).toEqual(user.username);
  });
});
