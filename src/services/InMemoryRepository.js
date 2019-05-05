export default class InMemoryRepository {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    this._users.push(user);
  }

  getUser(username) {
    return this._users.find(user => user.username === username);
  }
}
