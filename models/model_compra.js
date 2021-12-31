const { Sequelize, Model, DataTypes } = require('sequelize')
const { Loja } = require('./model_loja')
const { User } = require('./model_user')

const sequelize = new Sequelize.Sequelize('joaoferr_ESMAPP_21_22_GRP3', 'joaoferr_ESMAPP_21_22_GRP3', 'jsxNQp7rJ9zC4vzm', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})
class Compra extends Model { }

Compra.init({
    data: DataTypes.DATE,
    pagamento: DataTypes.STRING

}, { sequelize, modelName: 'compra',freezeTableName: true })

Compra.belongsTo(User)
User.hasMany(Compra)

Compra.belongsToMany(Loja, { through: "compra_artigos" })
Loja.belongsToMany(Compra, { through: "compra_artigos" })





sequelize.sync().then(() => { console.log("Sincronizado com sucesso") }).catch(error => {
    console.log(error);
})

exports.Compra = Compra;