const request = require('supertest');
const server = require('./Server');

const user1 = {
  username: 'user1',
  password: 'password1',
};

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
  });

  describe('/register', () => {
    it('allows users to register a user', async () => {
      const response = await request(server)
        .post('/register')
        .send(user1);
      expect(response.status).toEqual(200);
    });
  });
});
