import SessionService from './SessionService';

// simple autoincrementing implementation for stub
const stubSessionIdGenerator = {
  count: -1,
  generateId() {
    this.count += 1;
    return this.count.toString();
  },
  reset() {
    this.count = -1;
  },
};

const duplicateSessionIdGenerator = {
  startIndex: -1,
  sessionIds: ['0', '0', '1'],
  generateId() {
    this.startIndex += 1;
    return this.sessionIds[this.startIndex];
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

  it('returns sessionId if user already has a session and tries to create another session', () => {
    const sessionId = sessionService.createSession(user);
    const repeatSessionId = sessionService.createSession(user);
    expect(repeatSessionId).toEqual(sessionId);
  });

  it('generates a sessionId when creating a new user session', () => {
    const newSessionId = sessionService.createSession(user);
    expect(newSessionId).toEqual('0');
  });

  it('verifies that a given sessionId exists and returns username for that session', () => {
    sessionService.createSession(user);

    expect(() => {
      sessionService.verifySession('fakeSessionId');
    }).toThrow('Session does not exist.');

    const username = sessionService.verifySession('0');
    expect(username).toEqual(user.username);
  });

  it('generates unique sessionIds by running generateId() until it gets a sessionId that is not in use', () => {
    // this duplicationSessionIdGenerator is rigged to generate 0, 0, 1
    sessionService = new SessionService(duplicateSessionIdGenerator);
    const sessionId1 = sessionService.createSession(user);
    const sessionId2 = sessionService.createSession(user2);
    expect(sessionId1).not.toEqual(sessionId2);
  });
});
