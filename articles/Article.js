// Article.js
const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

(async () => {
    await connection.sync({ force: false });
  })();


Category.hasMany(Article)
Article.belongsTo(Category)


module.exports = Article;