const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "使用者姓名為必填"],
    },
    email: {
      type: String,
      required: [true, "Email 信箱為必填"],
      lowercase: true,
      trim: true,
      unique: [true, "此信箱已被使用，請更換其他信箱"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "請輸入有效的 Email 信箱"],
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
