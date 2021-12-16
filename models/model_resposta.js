const { Sequelize, Model, DataTypes } = require('sequelize')
const { Pergunta } = require('./model_pergunta')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
class Resposta extends Model { }

Resposta.init({
    texto: DataTypes.STRING,
    veracidade: DataTypes.BOOLEAN
}, { sequelize, modelName: 'resposta' })

Resposta.belongsTo(Pergunta)
Pergunta.hasMany(Resposta)






sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Resposta = Resposta;