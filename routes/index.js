var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

// Home
router.get('/', (req, res) => {
  res.render('index', { title: 'Doguito API' });
});

router.get('/all-collections', asyncHandler(async (req, res) => {
  res.send(await res.app.get('sodaService').getAllCollections());
}));



module.exports = router;
