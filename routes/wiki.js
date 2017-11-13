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
		status: req.body.page_status,

	});
	const user = User.build({
		name: req.body.author,
		email: req.body.author_email
	})
	user.save().then(() => {return page.save()}).then(
		function(savedPage){
			// console.log(url);
			res.redirect(savedPage.route)
		});
});

router.get('/add', (req, res) => {
	res.render('addpage.html');
});

router.get('/:urlTitle', (req, res, next) => {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	}).then(function(foundPage) {
		console.log(foundPage.dataValues);
		res.render('../views/wikipage.html', {data: foundPage.dataValues})
	}).catch(next);
})



module.exports = router;