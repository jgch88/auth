export default class IdGenerator {
  // https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
  static generateId() {
    return Math.random().toString(36).slice(2);
  }
}
