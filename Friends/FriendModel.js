const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  } // Date,  required, defaults to current date
});
// bear_list

const FriendModel = mongoose.model('Friend', FriendSchema);

module.exports = FriendModel;
