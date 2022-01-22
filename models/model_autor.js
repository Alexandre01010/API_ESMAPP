const { Sequelize, Model, DataTypes } = require('sequelize')
const { Exposicao } = require('./model_exposicao')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
class Autor extends Model { }

Autor.init({
    nome: DataTypes.STRING,
    biografia: DataTypes.STRING

}, { sequelize, modelName: 'autor', freezeTableName: true })

Exposicao.belongsTo(Autor)
Autor.hasMany(Exposicao)


sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Autor = Autor;