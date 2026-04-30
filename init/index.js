const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/roamres";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
  const seedOwnerId = new mongoose.Types.ObjectId("69e3453784447d05c728d2a5");

  // Upsert seed data so existing listing IDs remain stable across reseeds.
  for (const obj of initData.data) {
    await Listing.findOneAndUpdate(
      { title: obj.title, location: obj.location, country: obj.country },
      { ...obj, owner: seedOwnerId },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );
  }

  console.log(" Data initialized");
};

initDB();