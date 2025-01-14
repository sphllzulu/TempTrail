// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      destination: { type: String, required: true },
      name: { type: String, required: true }, // User's name
    },
  ],
  searchHistory: [
    {
      destination: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});
//function or second parameter runs before saving user to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  //calls next to tell mongoose that its done with this current opertion, it can now proceed
  //to save user to the  database
  next();
});

module.exports = mongoose.model('User', userSchema);