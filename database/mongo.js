const mongoose = require("mongoose");

module.exports.connectToDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
    }
  } catch (err) {
    console.error("App starting error:", err.message);
    process.exit(1);
  }
};
