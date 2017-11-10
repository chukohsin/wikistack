var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const User = db.define('user', {
	name: Sequelize.STRING,
	email: {type: Sequelize.STRING,
			validate: {isEmail: true}}
});

const Page = db.define('page', {
	title: Sequelize.STRING,
	urlTitle: {type: Sequelize.STRING, validate: {isUrl: true}},
	content: Sequelize.STRING,
	status: Sequelize.ENUM('open', 'closed')
});

module.exports = {db};


