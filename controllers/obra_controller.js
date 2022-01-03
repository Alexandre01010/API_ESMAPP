const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_obra');
const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Obra = Model.Obra;


const listAll = (req, res) => {
    Obra.findAll().then((clientesList) => {
        if (clientesList.length > 0) {
            res.status(200).json(clientesList)
        } else {
            res.status(204).send("sem resultados")
        }

    }).catch((error) => {
        res.status(400).send('Error');
    })
}

const createObra = (req, res) => {
    
}

exports.listAll = listAll