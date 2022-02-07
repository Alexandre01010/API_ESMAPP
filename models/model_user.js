const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
/**
 * @typedef Users
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} email.required
 */

class User extends Model { }

User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    pontos: DataTypes.INTEGER,

}, { sequelize, modelName: 'user', freezeTableName: true })

sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.User = User;