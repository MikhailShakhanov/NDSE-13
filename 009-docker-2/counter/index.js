const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL || 'redispw@localhost:49153';

const app = express();
const client = redis.createClient(`redis://${REDIS_URL}`);

app.get('/counter/:bookId', (req, res) => {
  const { bookId } = req.params;
  client.get(bookId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ counter: parseInt(result) });
    }
  });
});

app.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params;

  client.incr(bookId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        counter: parseInt(result),
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example http://localhost:${PORT} app listening on port ${PORT}`);
});
