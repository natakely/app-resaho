const mongoose  = require("mongoose")

const connectDb = async () => {
  try {
    const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/test";
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo error:", err);
  }
}

module.exports = connectDb;