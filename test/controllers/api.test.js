const request = require('supertest');
const app = require('../../app.js');

describe('GET /api/v1', () => {
   it('should return 200 OK', (done) => {
       request(app)
       .get('/')
       .expect(200, done);
   });
});

describe('GET /api/v1/random-url', () => {
   it('should return 404', (done) => {
       request(app)
       .get('/reset')
       .expect(404, done);
   });
});
