const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
class Exposicao extends Model { }

Exposicao.init({
    QrCode: DataTypes.STRING,
    pontos: DataTypes.INTEGER,
    nomeAutor: DataTypes.STRING,
    numeroPiso: DataTypes.INTEGER,
    txtApresentacao: DataTypes.STRING,
    img: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE

}, { sequelize, modelName: 'exposicao' })



sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Exposicao = Exposicao;