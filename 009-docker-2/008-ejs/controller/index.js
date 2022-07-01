const express = require('express');

const router = express.Router();

const config = require('../config');

router.get('/', (req, res) => {
  res.redirect(`/${config.ROOT_URL}/books`);
});

module.exports = router;
