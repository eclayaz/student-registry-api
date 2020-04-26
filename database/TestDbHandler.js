const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Student = require("../models/StudentModel");
const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);
};

module.exports.addData = async () => {
  const student = [
    {
      _id: "5ea1dfc56d485cd446b54d90",
      name: "name 1",
      gender: "Male",
      address: "address 1",
      contactNumber: "0771",
      subjects: ["English"],
    },
    {
      _id: "5ea1dfc66d485cd446b54d91",
      name: "name 2",
      gender: "Female",
      address: "address 2",
      contactNumber: "0772",
      subjects: ["Maths"],
    },
    {
      _id: "5ea1dfc56d485cd446b54d92",
      name: "name 3",
      gender: "Male",
      address: "address 3",
      contactNumber: "0773",
      subjects: ["English", "Maths"],
    },
    {
      _id: "5ea1dfc66d485cd446b54d93",
      name: "name 4",
      gender: "Male",
      address: "address 4",
      contactNumber: "0774",
      subjects: ["English"],
    },
    {
      _id: "5ea1dfc56d485cd446b54d94",
      name: "name 5",
      gender: "Female",
      address: "address 5",
      contactNumber: "0775",
      subjects: [],
    },
    {
      _id: "5ea1dfc66d485cd446b54d95",
      name: "name 6",
      gender: "Male",
      address: "address 6",
      contactNumber: "077",
      subjects: ["English"],
    },
  ];

  await Student.create(student);
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
