var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', 
{logging: false});

const User = db.define('user', {
	name: {
		type: Sequelize.STRING, 
		allowNull:false
	},
	email: {
		type: Sequelize.STRING,
			validate: {isEmail: true},
			allowNull:false
		}
});

const Page = db.define('page', {

	title: {
		type: Sequelize.STRING, allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING, 
		//validate: {isUrl: true},
		allowNull: false
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	},
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
	}, 
	hooks: {
		beforeValidate: function(page) {
			if(page.title){
				page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
			} else {
				page.urlTitle = Math.random().toString(36).substring(2, 7);
			}
		}
	}
});

module.exports = {
  Page: Page,
  User: User,
  db:db
};


