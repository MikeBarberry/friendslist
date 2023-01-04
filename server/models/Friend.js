const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema(
  {
    name: {
      type: String,
    },
    activity: {
      type: String,
    },
    food: {
      type: String,
    },
  },
  { autoIndex: true }
);

module.exports = Friend = mongoose.model('Friend', FriendSchema);
