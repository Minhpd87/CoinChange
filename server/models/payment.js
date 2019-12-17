const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const paymentSchema = new mongoose.Schema({
  //ID
  paymentID: {
    type: Number,
    unique: true,
    default: 1
  },

  //Note as value, count, total
  note1k: {
    type: Array,
    default: [1000, 0, 0]
  },
  note2k: {
    type: Array,
    default: [2000, 0, 0]
  },
  note5k: {
    type: Array,
    default: [5000, 0, 0]
  },
  note10k: {
    type: Array,
    default: [10000, 0, 0]
  },
  note20k: {
    type: Array,
    default: [20000, 0, 0]
  },
  note50k: {
    type: Array,
    default: [50000, 0, 0]
  },
  note100k: {
    type: Array,
    default: [100000, 0, 0]
  },
  note200k: {
    type: Array,
    default: [200000, 0, 0]
  },
  note500k: {
    type: Array,
    default: [500000, 0, 0]
  },

  //Payment has to be made
  mustPay: {
    type: Number,
    default: 0
  },

  //Time of payment
  timeLog: {
    type: Date,
    default: new Date()
  }
});

//toJSON function for returning data to browser
paymentSchema.set("toJSON", {
  transform: (document, newDocument) => {
    newDocument.id = newDocument._id.toString();
    delete newDocument._id;
    delete newDocument.__v;
  }
});

paymentSchema.plugin(uniqueValidator);

const payment = mongoose.model("payment", paymentSchema);

module.exports = { payment };
