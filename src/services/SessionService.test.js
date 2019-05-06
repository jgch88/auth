import SessionService from './SessionService';

const user = {
  username: 'user1',
  password: '1234',
};

const sessionId = 'someKindOfSessionId';

let sessionService;

beforeEach(() => {
  sessionService = new SessionService();
});


describe('SessionService', () => {
  it('can display a map of logged in sessions', () => {
    expect(sessionService.sessions).toEqual({});
  });

  it('assigns a sessionId when creating a new user session', () => {
    const newSessionId = sessionService.createSession(user);
    expect(newSessionId).toEqual(sessionId); // use a mock "sessionId generator"
  });

  it('stores newly created user sessions', () => {
    // iterate over the map and check that first entry's value is equal to username
  });

  it('verifies that a given sessionId exists and returns session information', () => {
    expect(() => {
      sessionService.verifySession('fakeSessionId');
    }).toThrow('Session does not exist.');

    /*
    const sessionInfo = sessionService.verifySession(sessionId);
    expect(sessionInfo).toHaveProperty('username');
    expect(sessionInfo).toHaveProperty('sessionId');
    */
  });
});
