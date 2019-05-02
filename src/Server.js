export default class Math {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  printName() {
    // eslint-disable-next-line no-console
    console.log(`Hi ${this.name}!`);
  }
}
