import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  path: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  uploadFname: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    enum: ["private", "public"],
    required: true,
    default: "private",
  },
});

export const FileModel = mongoose.model("File", FileSchema);
export default FileModel;
