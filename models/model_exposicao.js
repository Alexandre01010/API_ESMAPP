const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
/**
 * @typedef Exposições
 * @property {string} img.required
 * @property {string} txtApresentacao.required
 * @property {integer} pontos
 * @property {integer} numeroPiso.required
 * @property {string} tituloExposicao.required
 */


class Exposicao extends Model { }

Exposicao.init({
    QrCode: DataTypes.TEXT,
    pontos: DataTypes.INTEGER,
    tituloExposicao: DataTypes.STRING,
    numeroPiso: DataTypes.INTEGER,
    txtApresentacao: DataTypes.STRING,
    img: DataTypes.TEXT,
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE

}, { sequelize, modelName: 'exposicao',freezeTableName: true })



sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Exposicao = Exposicao;