const mongoose = require("mongoose");

const dbConnection = async () => {
  console.log(process.env.MONGODB_CNN)
  try {
    const db = await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true
    });

    console.log("database is connected");
    return db
  } catch (error) {
    throw new Error("DB error connection", error);
  }
};

module.exports ={
    dbConnection
}
