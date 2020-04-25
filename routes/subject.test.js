const supertest = require("supertest");
const app = require("../app"); // Link to your server file
const request = supertest(app);

describe("Subjects GET Endpoints", () => {
  it("should get all subjects", async () => {
    const res = await request.get("/subjects");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });
});
