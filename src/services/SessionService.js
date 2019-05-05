// Session Service responsibility: to keep track of open user sessions

export default class SessionService {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    this._users.push(user.username);
  }

  get users() {
    return this._users;
  }

  // simply return the username as a cookie
  getCookie(user) {
    return this._users.find(u => u === user.username);
  }
}
