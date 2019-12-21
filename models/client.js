const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    client: {
      type: String,
      required: true,
      lowercase: true,
      max: 255,
      index: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Client', clientSchema);
