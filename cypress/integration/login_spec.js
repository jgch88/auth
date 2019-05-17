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

describe('User Goals', () => {
  const user1 = {
    username: 'user1',
    password: 'password1',
  };

  const user2 = {
    username: 'user2',
    password: 'password2',
  };

  it('Multiple users can register an account successfully', () => {
    cy.visit('localhost:3000/register');
    cy.get('#registerUsernameInput').type(user1.username);
    cy.get('#registerPasswordInput').type(user1.password);
    cy.get('#registerSignUpButton').click();
    cy.get('.title').should('contain', 'Sign Up Successful!');
    cy.get('.subtitle').should('contain', `Thanks for registering, ${user1.username}.`);

    cy.visit('localhost:3000/register');
    cy.get('#registerUsernameInput').type(user2.username);
    cy.get('#registerPasswordInput').type(user2.password);
    cy.get('#registerSignUpButton').click();
    cy.get('.title').should('contain', 'Sign Up Successful!');
    cy.get('.subtitle').should('contain', `Thanks for registering, ${user2.username}.`);
  });

  it('User cannot register with an already existing username', () => {
    // user1 has already been registered once in the test above
    cy.visit('localhost:3000/register');
    cy.get('#registerUsernameInput').type(user1.username);
    cy.get('#registerPasswordInput').type(user1.password);
    cy.get('#registerSignUpButton').click();
    cy.get('#registerErrorMessage').should('contain', 'Something went wrong.');
  });

  it('User cannot log in with wrong credentials', () => {
    // user1 has already been registered once in the test above
    cy.visit('localhost:3000/login');
    cy.get('#loginUsernameInput').type(user1.username);
    cy.get('#loginPasswordInput').type('wrongpassword');
    cy.get('#loginButton').click();
    cy.get('#loginErrorMessage').should('contain', 'Username or password invalid.');
  });

  it('User can log in with correct credentials', () => {
    // user1 has already been registered once in the test above
    cy.visit('localhost:3000/login');
    cy.get('#loginUsernameInput').type(user1.username);
    cy.get('#loginPasswordInput').type(user1.password);
    cy.get('#loginButton').click();
    cy.get('.title').should('contain', 'Login Successful!');
    cy.get('.subtitle').should('contain', `Logged in as: ${user1.username}.`);
  });

  it('User can log in access /protected after logging in', () => {
    cy.visit('localhost:3000/login');
    cy.get('#loginUsernameInput').type(user1.username);
    cy.get('#loginPasswordInput').type(user1.password);
    cy.get('#loginButton').click();
    cy.request('GET', 'localhost:3000/protected')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('User cannot access /protected after logging out', () => {
    cy.visit('localhost:3000/login');
    cy.get('#loginUsernameInput').type(user1.username);
    cy.get('#loginPasswordInput').type(user1.password);
    cy.get('#loginButton').click();
    cy.visit('localhost:3000/logout');
    cy.request('GET', 'localhost:3000/protected')
      .then((response) => {
        expect(response.status).to.eq(401);
      });
  });
});
