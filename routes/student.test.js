const supertest = require("supertest");
const app = require("../app"); // Link to your server file
const request = supertest(app);

describe("Students GET Endpoints", () => {
  it("should get all students", async () => {
    const res = await request.get("/students?page=1&limit=4");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.data.length).toBe(4);
  });

  it("should get one student", async () => {
    const res = await request.get("/students/5ea1dfc56d485cd446b54d90/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data).toHaveProperty("gender");
    expect(res.body.data).toHaveProperty("address");
    expect(res.body.data).toHaveProperty("contactNumber");
    expect(res.body.data).toHaveProperty("subjects");
  });
});

describe("Students POST Endpoints", () => {
  it("should create students", async () => {
    const res = await request.post("/students").send({
      name: "Nadeesha Dilruwna",
      gender: "Male",
      address: "Panadura",
      contactNumber: "0766838371",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data).toHaveProperty("name", "Nadeesha Dilruwna");
  });

  it("student create should throw 422", async () => {
    const res = await request.post("/students").send({
      name: "Nadeesha Dilruwna",
      address: "Panadura",
      contactNumber: "0766838371",
    });
    expect(res.statusCode).toBe(422);
  });
});

describe("Students PUT Endpoints", () => {
  it("should update students subjects", async () => {
    const res = await request.put("/students/5ea1dfc56d485cd446b54d90/subjects").send({
      subjects:["Maths", "English"]
    });
    expect(res.statusCode).toBe(200);
  });

  it("students update should throw 422", async () => {
    const res = await request.put("/students/5ea1dfc56d485cd446b54d90/subjects").send({
      subjects:{subjects: ["Maths", "English"]}
    });
    expect(res.statusCode).toBe(422);
  });
});
