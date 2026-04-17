const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

// apply plugin correctly
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);