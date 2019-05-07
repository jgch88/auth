describe('Login Page', () => {
  it('User can enter username and password', () => {
    cy.visit('localhost:3000/login');
    cy.title().should('contain', 'Login');
    cy.get('h1').should('contain', 'Login');
    cy.get('#loginUsernameInput').type('user1');
    cy.get('#loginPasswordInput').type('password1');
  });
});

describe('Registration Page', () => {
  it('User can enter username and password', () => {
    cy.visit('localhost:3000/register');
    cy.title().should('contain', 'Sign Up');
    cy.get('h1').should('contain', 'Sign Up');
    cy.get('#registerUsernameInput').type('user1');
    cy.get('#registerPasswordInput').type('password1');
  });
});
