const mongoose = require("mongoose");

// Schema for Creating user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  pic: {
    type: String,
    required: true,
    default: "https://fakeimg.pl/350x200/?text=Hello",
  },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = { userModel };
