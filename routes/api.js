var express = require('express');
var router = express.Router();
var Frame = require('../lib/frame');

router.get('/heartbeat', function (req, res) {
  res.send();
});

function mapFrame(frame) {
  return {
    index: frame.frameIndex,
    tags: frame.tags
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
