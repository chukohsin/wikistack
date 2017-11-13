const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userRouter = require('./user');
const wikiRouter = require('./wiki');


router.get('/', (req, res) => {
	res.render('index.html');
})

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);




module.exports = router;
