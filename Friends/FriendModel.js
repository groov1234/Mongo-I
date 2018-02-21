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
    required: true // must be between 1-20 not quite sure how to implement it
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
