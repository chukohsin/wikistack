var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', 
{logging: false});

const User = db.define('user', {
	name: {
		type: Sequelize.STRING, 
		validate: {allowNull: false}
	},
	email: {
		type: Sequelize.STRING,
			validate: {isEmail: true, allowNull:false}
		}
});

const Page = db.define('page', {
	title: {
		type: Sequelize.STRING, 
		validate: {allowNull: false}
	},
	urlTitle: {
		type: Sequelize.STRING, 
		validate: {isUrl: true, allowNull: false}
	},
	content: {
		type: Sequelize.STRING, 
		validate: {allowNull: false}
	},
	// status: {type: Sequelize.ENUM('open', 'closed')}
	status: Sequelize.ENUM('open', 'closed'),
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	getterMethods: {
		route() {
			return '/wiki/' + this.urlTitle;
		}
	}
});

module.exports = {db};


