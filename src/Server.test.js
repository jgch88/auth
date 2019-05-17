const request = require('supertest');
const server = require('./Server');

const user1 = {
  username: 'user1',
  password: 'password1',
};

const user2 = {
  username: 'user2',
  password: 'password2',
};

const user3 = {
  username: 'user3',
  password: 'password3',
};
/* How do I teardown/restart a singleton server? So that I can reuse the same user for /register?
beforeEach(() => {
  server = require('./Server');
})
*/

afterEach(() => {
  server.close();
});

describe('server', () => {
  test('exists and responds as expected', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });

  describe('/login', () => {
    it('returns correct login status response when login user is not found', async () => {
      const response = await request(server)
        .post('/login')
        .send(user1);
      expect(response.body).toEqual({
        loginStatus: 'Username or password invalid.',
      });
    });

    it('returns correct login status response when user is found but password is invalid', async () => {
      await request(server)
        .post('/register')
        .send(user3);

      const response = await request(server)
        .post('/login')
        .send({
          username: 'user3',
          password: 'wrongpassword',
        });
      expect(response.body).toEqual({
        loginStatus: 'Username or password invalid.',
      });
    });


    it('allows registered users to login', async () => {
      await request(server)
        .post('/register')
        .send(user1);

      const response = await request(server)
        .post('/login')
        .send(user1);
      expect(response.status).toEqual(200);
    });

    it('requests client browser to set a session cookie upon successful login', async () => {
      // we need an agent to store the cookies like a browser, request(server) is inadequate
      const agent = request.agent(server);
      const response = await agent
        .post('/login')
        .send(user1)
        .expect('set-cookie', /^sessionId=[a-z0-9]{1,12}; Path=\/$/g);
      expect(response.status).toEqual(200);
    });
  });

  describe('/register', () => {
    it('allows users to register a user', async () => {
      const response = await request(server)
        .post('/register')
        .send(user2);
      expect(response.status).toEqual(200);
    });
  });

  describe('/protected', () => {
    it('returns HTTP status of 401 when user is not logged in', async () => {
      const response = await request(server)
        .get('/protected');
      expect(response.status).toBe(401);
    });

    it('returns HTTP status of 200 when user is logged in', async () => {
      const agent = request.agent(server);
      const notLoggedInresponse = await agent
        .get('/protected');
      expect(notLoggedInresponse.status).toBe(401);

      await agent
        .post('/login')
        .send(user1);

      const loggedInResponse = await agent
        .get('/protected');
      expect(loggedInResponse.status).toBe(200);
    });
  });

  describe('/logout', () => {
    it('allows the user to logout', async () => {
      const response = await request(server)
        .get('/logout');
      expect(response.status).toBe(200);
    });

    it('clears cookies on logout', async () => {
      const agent = request.agent(server);
      await agent
        .post('/login')
        .send(user1);

      const loggedInResponse = await agent.get('/logout');
      expect(loggedInResponse.request.cookies).toContain('sessionId');
      // inspect the that the NEXT response's request has
      // no sessionId cookie as evidence the agent's cookie is cleared
      const loggedOutResponse = await agent.get('/');
      expect(loggedOutResponse.request.cookies).not.toContain('sessionId');
    });
  });
});
