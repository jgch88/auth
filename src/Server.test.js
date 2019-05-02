const request = require('supertest');
const server = require('./Server');

afterEach(() => {
  server.close();
});

describe('server', () => {
  // https://www.valentinog.com/blog/testing-api-koa-jest/
  test('exists and responds as expected', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });
});
