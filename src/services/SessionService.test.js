import SessionService from './SessionService';

const sessionId = 'someKindOfSessionId';

const stubSessionIdGenerator = {
  generateId() {
    return sessionId;
  },
};

const user = {
  username: 'user1',
  password: '1234',
};

let sessionService;

beforeEach(() => {
  sessionService = new SessionService(stubSessionIdGenerator);
});


describe('SessionService', () => {
  it('can display a map of logged in sessions', () => {
    expect(sessionService.sessions).toEqual({});
  });

  it('assigns a difficult to guess sessionId when creating a new user session', () => {
    const newSessionId = sessionService.createSession(user);
    expect(newSessionId).toEqual(sessionId); // use a mock "sessionId generator"
  });

  it('stores newly created user sessions', () => {
    expect(Object.keys(sessionService.sessions).length).toEqual(0);
    sessionService.createSession(user);
    expect(Object.keys(sessionService.sessions).length).toEqual(1);
  });

  it('verifies that a given sessionId exists and returns username for that session', () => {
    sessionService.createSession(user);

    expect(() => {
      sessionService.verifySession('fakeSessionId');
    }).toThrow('Session does not exist.');

    const username = sessionService.verifySession(sessionId);
    expect(username).toEqual(user.username);
  });
});
