const { Sequelize, Model, DataTypes } = require('sequelize')
const { User } = require('./model_user')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})

/**
 * @typedef Notificações
 * @property {string} texto.required
 * @property {boolean} visibilidade.required
 */

class Notificacao extends Model { }

Notificacao.init({
    texto: DataTypes.STRING,
    visibilidade: DataTypes.BOOLEAN,

}, { sequelize, modelName: 'notificacao',freezeTableName: true })

User.hasMany(Notificacao)
Notificacao.belongsTo(User)




sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Notificacao = Notificacao;