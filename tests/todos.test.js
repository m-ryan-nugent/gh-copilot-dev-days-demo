const request = require('supertest');
const app = require('../src/index');
const store = require('../src/store/todos');

beforeEach(() => store._reset());

describe('baseline', () => {
    it('GET /todos returns an empty array on a fresh start', async () => {
        const res = await request(app).get('/todos');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
});