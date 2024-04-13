import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },

  username: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },

  password: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },

  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
