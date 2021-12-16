const { Sequelize, Model, DataTypes } = require('sequelize')
const { Exposicao } = require('./model_exposicao')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
class Pergunta extends Model { }

Pergunta.init({
    texto: DataTypes.STRING,
    pontos: DataTypes.INTEGER
}, { sequelize, modelName: 'pergunta' })

Exposicao.hasMany(Pergunta)
Pergunta.belongsTo(Exposicao)





sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Pergunta = Pergunta;