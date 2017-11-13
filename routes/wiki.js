const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.get('/', (req, res) => {
	res.redirect('/');
});

router.post('/', (req, res) => {
	const page = Page.build({
		title: req.body.title,
		// urlTitle: Page.beforeValidate(req.body.title),
		content: req.body.page_content,
		status: 'closed',

	});
	page.save().then(
		function(){res.redirect('/');}
	)
});

router.get('/add', (req, res) => {
	res.render('addpage.html');
});


module.exports = router;