import IdGenerator from './IdGenerator';

const regex = /^[a-z0-9]{1,12}$/g;

describe('IdGenerator', () => {
  // generates a lowercase alphanumeric string between 0 and 12 characters long
  it('generates difficult to test ids', () => {
    const newId = IdGenerator.generateId();
    expect(regex.test(newId)).toEqual(true);

    /* to see the result of the match
    const regexResult = newId.match(regex)
    console.log(regexResult);
    */
  });
});
