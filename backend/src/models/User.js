const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      minlength: [7, "Phone number is too short"],
      maxlength: [20, "Phone number is too long"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must contain at least 8 characters"],
      select: false,
    },

    acceptedAgreement: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "You must accept the agreement",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);