import { test } from "node:test";
import assert from "node:assert/strict";
import { requestHandler } from "./server.js";

function fakeRes() {
  return {
    statusCode: 0,
    body: '',
    writeHead(code) { this.statusCode = code; },
    end(data) { this.body = JSON.parse(data); }
  };
}

test('GET /api/health ger 200', async () => {
    const req = { method: 'GET', url: '/api/health', headers: {} };
    const res = fakeRes();

    await requestHandler(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.status, 'ok');
});