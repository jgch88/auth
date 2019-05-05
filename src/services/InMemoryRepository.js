export default class InMemoryRepository {
  constructor() {
    this._users = [];
  }

  addUser(user) {
    const existingUser = this._users.find(u => u.username === user.username);

    if (existingUser) {
      throw new Error(`Username ${existingUser.username} already exists.`);
    }

    this._users.push(user);
  }

  getUser(username) {
    const result = this._users.find(user => user.username === username);

    if (!result) {
      throw new Error(`Username ${username} not found.`);
    }

    return result;
  }
}
