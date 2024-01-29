const mongoDb = require("mongoose");

const connection = async () => {
  try {
    await mongoDb.connect(process.env.MONGODBURL);
    console.log("connetion sussessful...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connection };
