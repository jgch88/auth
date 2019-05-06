export default class IdGenerator {
  // https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript

  // wanted to use a static method (utility Class), but difficult to use dependency injection
  // eslint-disable-next-line class-methods-use-this
  generateId() {
    return Math.random().toString(36).slice(2);
  }
}
