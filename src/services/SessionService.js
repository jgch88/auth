// Session Service responsibility: to keep track of open user sessions
// Keeps track via a mapping between sessionIds and usernames

export default class SessionService {
  constructor(idGenerator) {
    this._idGenerator = idGenerator;
    this._sessions = {};
  }

  createSession(user) {
    const users = Object.values(this._sessions);
    if (users.find(u => u === user.username)) {
      throw new Error('User session already exists.');
    }
    const sessionId = this._idGenerator.generateId();
    /*
    do {
      sessionId = this._idGenerator.generateId();
    } while (Object.keys(this._sessions).find(s => s === sessionId));
    */
    this._sessions[sessionId] = user.username;
    return sessionId;
  }

  get sessions() {
    return this._sessions;
  }

  verifySession(sessionId) {
    const username = this._sessions[sessionId];
    if (!username) {
      throw new Error('Session does not exist.');
    }
    return username;
  }
}
