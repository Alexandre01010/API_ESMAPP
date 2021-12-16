const { Sequelize, Model, DataTypes } = require('sequelize')
const { Exposicao } = require('./model_exposicao')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
class Obra extends Model { }

Obra.init({
    qrCode: DataTypes.STRING,
    pontos: DataTypes.INTEGER,
    img: DataTypes.STRING,
    titulo: DataTypes.STRING,
    metodoUsado: DataTypes.STRING,
    dimensoes: DataTypes.STRING
}, { sequelize, modelName: 'obra' })
Obra.belongsTo(Exposicao)
Exposicao.hasMany(Obra)




sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Obra = Obra;