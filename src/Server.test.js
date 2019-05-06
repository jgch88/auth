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
    it('returns HTTP status 401 when login is invalid', async () => {
      const response = await request(server)
        .post('/login')
        .send(user1);
      expect(response.status).toEqual(401);
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

    it('requests client browser to set a cookie upon successful login', async () => {
      // we need an agent to store the cookies like a browser, request(server) is inadequate
      const agent = request.agent(server);
      await agent
        .post('/login')
        .send(user1)
        .expect('set-cookie', `username=${user1.username}; Path=/`);
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
});
