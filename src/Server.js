export default class Math {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  printName() {
    console.log(`Hi ${this.name}!`);
  }
}
