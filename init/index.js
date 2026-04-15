const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

<img 
  src="<%= listing.image %>?w=500&auto=format&fit=crop&q=60"
  loading="lazy"
/>

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("Connected to db");
}).catch((er) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(Mongo_URL);
}
const initDB = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
}

initDB();