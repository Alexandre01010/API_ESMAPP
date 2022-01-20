const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_loja');
const ModelCompra = require('../models/model_compra');
//const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Loja = Model.Loja;
const Compra = ModelCompra.Compra


const listAll = (req, res) => {
    Loja.findAll().then((clientesList) => {
        if (clientesList.length > 0) {
            res.status(200).json(clientesList)
        } else {
            res.status(204).send("sem resultados")
        }

    }).catch((error) => {
        res.status(400).send('Error');
    })
}

exports.listAll = listAll