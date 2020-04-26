const MockModel = require("jest-mongoose-mock");
jest.mock("../models/StudentModel", () => new MockModel());
const Student = require("../models/StudentModel");
const StudentController = require("./StudentController");

let req;
let res = {
  end: function () {},
  status: function (s) {
    this.statusCode = s;
    return this;
  },
  json: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("create student", () => {
  const body = {
    name: "Nadeesha Dilruwna",
    gender: "Male",
    address: "Panadura",
    contactNumber: "0766838371",
    subjects: ["Maths", "Science"],
  };

  beforeEach(() => {
    req = {
      body,
    };
  });

  it("Calls findById methods on Student model", async () => {
    await StudentController.studentStore(req, res);

    expect(Student.create.mock.calls.length).toBe(1);
    expect(Student.create.mock.calls[0][0]).toEqual(body);
  });
});

describe("get students", () => {
  let id = "5ea3e5cd489cd105685894a6";

  it("Calls findById methods on Student model", async () => {
    req = {
      params: { id },
    };

    await StudentController.studentDetails(req, res);

    expect(Student.findById.mock.calls.length).toBe(1);
    expect(Student.findById.mock.calls[0][0]).toEqual(id);
    expect(Student.findById.mock.calls[0][1]).toEqual(
      "_id name gender address contactNumber subjects"
    );
  });

  it("Calls find methods on Student model", async () => {
    req = {
      query: { page: 1, limit: 5 },
    };

    await StudentController.studentList(req, res);

    expect(Student.find.mock.calls.length).toBe(1);
    expect(Student.find.mock.calls[0][0]).toEqual({});
    expect(Student.find.mock.calls[0][1]).toEqual(
      "_id name gender address contactNumber subjects"
    );
  });
});

describe("update student", () => {
  let id = "5ea3e5cd489cd105685894a6";
  const body = {
    subjects: ["Maths", "Science"],
  };

  beforeEach(() => {
    req = {
      params: { id },
      body,
    };
  });

  it("Calls updateOne methods on Student model", async () => {
    await StudentController.enrollSubjects(req, res);

    expect(Student.updateOne.mock.calls.length).toBe(1);
    expect(Student.updateOne.mock.calls[0][0]).toEqual({ _id: id });
    expect(Student.updateOne.mock.calls[0][1]).toEqual({
      subjects: body.subjects,
    });
  });
});
