const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log(`MongoDB successfully connected to ${mongoUri}`);
}

module.exports = { dbConnect };