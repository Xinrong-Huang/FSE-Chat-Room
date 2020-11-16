var express = require('express');
var router = express.Router();

/**
 * Render the chat page.
 *
 * @name Chat page
 * @route {GET} /chat
 */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'FSE Chat Room' });
});

module.exports = router;
