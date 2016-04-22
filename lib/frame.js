// env
if (!process.env.MONGODB_CONNECTION) {
  console.log("MONGODB_CONNECTION environment variable required.");
  process.exit(1);
}

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION);

var Schema = mongoose.Schema;

var frameSchema = new Schema({
  videoId: String,
  frameIndex: Number,
  uri: String,
  tags: { type: [String] }
});

frameSchema.index({ tags: 'text' });

frameSchema.statics.getVideoFrames = function (videoId, fn) {
  return this.find({ videoId: videoId }, fn);
};

frameSchema.statics.searchVideoFrames = function (videoId, keyword, fn) {
  return this.find({ videoId: videoId, $text: {$search: keyword}}, null, {sort: {frameIndex: 1}}, fn);
};

module.exports = mongoose.model('Frame', frameSchema);
