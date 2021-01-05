const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: 'Bloggy',
  username: 'postgres',
  password: 'Jblanch94!',
  port: 5432,
});
