const { Sequelize, Model, DataTypes } = require('sequelize')
const { Exposicao } = require('./model_exposicao')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
/**
 * @typedef Obras
 * @property {string} qrCode.required
 * @property {string} img.required
 * @property {string} dimensoes.required
 * @property {integer} pontos.required
 * @property {string} dimensoes.required
 * @property {string} metodoUsado.required
 * @property {string} titulo.required
 */

class Obra extends Model { }

Obra.init({
    qrCode: DataTypes.TEXT,
    pontos: DataTypes.INTEGER,
    img: DataTypes.TEXT,
    titulo: DataTypes.STRING,
    metodoUsado: DataTypes.STRING,
    dimensoes: DataTypes.STRING
}, { sequelize, modelName: 'obra',freezeTableName: true })

Exposicao.hasMany(Obra)
Obra.belongsTo(Exposicao)





sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Obra = Obra;