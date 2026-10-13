const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [100, "Name is too long"],
    },

    method: {
      type: String,
      required: true,
      enum: ["Telebirr", "CBE"],
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Account information is too short"],
      maxlength: [50, "Account information is too long"],
    },

    amount: {
      type: Number,
      
      min: [1, "Withdrawal amount must be greater than zero"],
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

module.exports = mongoose.model("Withdrawal", withdrawalSchema);