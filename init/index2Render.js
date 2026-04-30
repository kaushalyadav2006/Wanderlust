if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "../.env", quiet: true });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const Mongo_URL = process.env.ATLASDB_URL;

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_URL);
  await initDB();
  await mongoose.connection.close();
}

const initDB = async () => {
  await Listing.deleteMany({});

  const user = await User.findOne();

  if (!user) {
    throw new Error("No user found in database");
  }

  const data = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,
  }));

  await Listing.insertMany(data);
  console.log("Data initialized");
};