const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_user');
const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const User = Model.User;


const listAll = (req, res) => {
    User.findAll().then((clientesList) => {
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
