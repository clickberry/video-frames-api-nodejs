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
  segmentIndex: Number,
  frameIndex: Number,
  uri: String,
  tags: [String],
  text: new Schema({
    description: String,
    words: [new Schema({ 
      text: String, 
      vertices: [new Schema({
        x: Number, 
        y: Number
      }, {_id: false})] 
    }, {_id: false})]
  }, {_id: false}),
  logos: [new Schema({ 
    description: String, 
    vertices: [new Schema({
      x: Number, 
      y: Number
    }, {_id: false})] 
  }, {_id: false})],
  faces: [new Schema({
    vertices: [new Schema({
      x: Number, 
      y: Number
    }, {_id: false})]
  }, {_id: false})]
});

frameSchema.index({ 'tags': 'text', 'text.description': 'text', 'logos.description': 'text' });

frameSchema.statics.getVideoFrames = function (videoId, fn) {
  return this.find({ videoId: videoId }, fn);
};

frameSchema.statics.searchVideoFrames = function (videoId, keyword, fn) {
  return this.find({ videoId: videoId, $text: {$search: keyword}}, null, {sort: {segmentIndex: 1, frameIndex: 1}}, fn);
};

module.exports = mongoose.model('Frame', frameSchema);
