const request = require("supertest");
const app = require("./index");

describe("POST /", () => {
  it("responds with a completion message", async () => {
    const res = await request(app)
      .post("/")
      .send({ message: "what is the meaning of Life" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: expect.any(String) });
  });
});
