// Session Service responsibility: to keep track of open user sessions
// Keeps track via a mapping between sessionIds and usernames

export default class SessionService {
  constructor(idGenerator) {
    this._idGenerator = idGenerator;
    this._sessions = {};
  }

  createSession(user) {
    const userSession = this._getUserSession(user);
    if (userSession) {
      return userSession;
    }

    const sessionId = this._generateUniqueSessionId();
    this._sessions[sessionId] = user.username;
    return sessionId;
  }

  removeSession(sessionId) {
    delete this._sessions[sessionId];
  }

  _getUserSession(user) {
    const sessionEntries = Object.entries(this._sessions);
    const userIndex = sessionEntries.findIndex(e => e[1] === user.username);
    if (userIndex !== -1) {
      return sessionEntries[userIndex][0];
    }
    return null;
  }

  _generateUniqueSessionId() {
    let sessionId;
    do {
      sessionId = this._idGenerator.generateId();
    } while (sessionId in this._sessions);

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
