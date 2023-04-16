const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const postSchema = new Schema(
  {
    article: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    datetime: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "此欄位為必填"],
      ref: "users",
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
