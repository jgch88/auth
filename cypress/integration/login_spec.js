describe('Login Page', () => {
  it('Shows a title and login form', () => {
    cy.visit('localhost:3000/login');
    cy.title().should('contain', 'Login');
    cy.get('h1').should('contain', 'Login');
  });
});
