const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
/**
 * @typedef Loja
 * @property {string} textoArtigo.required
 * @property {float} euros.required
 * @property {integer} pontosRequeridos.required
 * @property {string} img.required
 */

class Loja extends Model { }

Loja.init({
    textoArtigo: DataTypes.STRING,
    euros:DataTypes.FLOAT,
    pontosRequeridos:DataTypes.INTEGER,
    img:DataTypes.TEXT
    
}, { sequelize, modelName: 'loja',freezeTableName: true })






sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Loja = Loja;