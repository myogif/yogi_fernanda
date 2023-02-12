const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id: false,
    // Id:{
    //   type: String,
    //   unique: true,
    //   index: true,
    // },
    userName:{
      type: String,
      required: true,
      index: { unique: true }

    },
    accountNumber:{
      type: Number,
      required: true,
      // unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: Number,
      required: true
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("users", userSchema);