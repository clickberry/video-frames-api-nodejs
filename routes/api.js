var express = require('express');
var router = express.Router();
var Frame = require('../lib/frame');

router.get('/heartbeat', function (req, res) {
  res.send();
});

function mapFrame(frame) {
  return {
    videoUri: frame.videoUri,
    image: frame.uri,
    segmentIndex: frame.segmentIndex,
    frameIndex: frame.frameIndex,
    tags: frame.tags,
    text: frame.text,
    logos: frame.logos,
    faces: frame.faces
  };
}

router.get('/:video_id',
  function (req, res, next) {
    Frame.getVideoFrames(req.params.video_id, function (err, frames) {
      if (err) return next(err);
      res.json(frames.map(mapFrame));
    });
  });

router.get('/:video_id/:keyword',
  function (req, res, next) {
    Frame.searchVideoFrames(req.params.video_id, req.params.keyword, function (err, frames) {
      if (err) return next(err);
      res.json(frames.map(mapFrame));
    });
  });

module.exports = router;
