const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userRouter = require('./user');
const wikiRouter = require('./wiki');
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', (req, res, next) => {
	Page.findAll({
		attributes: ['title', 'urlTitle']
	}).then(function(foundAttr) {
		const pages = foundAttr.map((a) => a.dataValues);
		// const urls = foundAttr.map((a) => a.dataValues.urlTitle);
		// console.log(pages, urls);
		// next();
		res.render('../views/index.html', {pages: pages})
	}).catch(next);
	// res.render('index.html', {pages: pages});
})

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);




module.exports = router;
