const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, index: true, required: true },
    // data: { type: Buffer, contentType: String },
    size: { type: Number },
    encoding: { type: String },
    md5: { type: String },
    fileId: { type: String, required: true, unique: true },
    mimetype: { type: String, required: true },
    upload_path: { type: String, required: true },
  },
  { timestamps: true }
);
// Custom field before save
schema.pre('save', (next) => {
  next();
});

module.exports = mongoose.model('FileUpload', schema);
