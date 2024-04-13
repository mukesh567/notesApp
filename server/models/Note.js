import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  videolink: {
    type: String,
  },
  imagelink: {
    type: String,
  },

  color: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Note", noteSchema);
