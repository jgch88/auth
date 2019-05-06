// Session Service responsibility: to keep track of open user sessions
// Keeps track via a mapping between sessionIds and usernames

export default class SessionService {
  constructor() {
    this._sessions = {};
  }

  // eslint-disable-next-line
  createSession(user) {
    const sessionId = 'someKindOfSessionId';
    return sessionId;
  }

  get sessions() {
    return this._sessions;
  }

  // eslint-disable-next-line
  verifySession(sessionId) {
    throw new Error('Session does not exist.');
  }
}
