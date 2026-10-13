const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [1, "Deposit amount must be greater than zero"],
    },

    referenceId: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Reference ID is too long"],
      unique: true,
    },
    phoneNumber: {
  type: String,
  trim: true,
  maxlength: [20, "Phone number is too long"],
  default: "",
},

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deposit", depositSchema);