const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/health', function(req, res, next) {
  res.json({
    status: true,
    message: 'Base service is in good condition 😀'
  })
});

module.exports = router;
