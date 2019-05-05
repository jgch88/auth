const request = require('supertest');
const server = require('./Server');

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
        .send({
          username: 'user1',
          password: 'password1',
        });

      expect(response.status).toEqual(401);
    });
  });
});
