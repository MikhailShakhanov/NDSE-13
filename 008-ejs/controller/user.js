const express = require('express');

const router = express.Router();

router.post('/login', function (req, res) {
  const loginResult = { id: 1, mail: 'test@mail.ru' };
  res.status(201);
  res.json(loginResult);
});

module.exports = router;
