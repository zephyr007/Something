const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const WebsiteModel = require('./models/websites')
const config = require('./config');

const db = config.DB;
const user = config.DB_USER;
const host = config.DB_HOST || 'localhost';
const password = config.DB_PASSWORD;

const sequelize = new Sequelize(db, user, password, {
    host: host,
    dialect: 'mysql',
    logging: false
});

const User = UserModel(sequelize, Sequelize);
const Web = WebsiteModel(sequelize, Sequelize);

User.belongsToMany(Web, {
    through: 'UserWebsites',
    as: 'websites',
    foreignKey: 'userId'
});

Web.belongsToMany(User, {
    through: 'UserWebsites',
    as: 'users',
    foreignKey: 'websiteId'
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected.');
}).catch((err) => {
    console.log('Database connection failed')
    throw err;
});

module.exports = {
    User, Web
};