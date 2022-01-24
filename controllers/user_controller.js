const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_user');
//const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const User = Model.User;
const { Op } = require("sequelize");


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

const signUp = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(409).json({
                message: "Dados já existentes"
            })
        } else {
            User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
                email: req.body.email,
                pontos: 0
            }).then(userCreated => {
                res.status(201).json({
                    message: "Utilizador criado com sucesso"
                })
            }).catch(error => {
                res.status(500).send(error)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const signIn = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                utilities.generateToken({ username: req.body.username }, token => {
                    res.status(200).json(token)
                })
            } else {
                res.status(400).json("Credenciais erradas")
            }
        }else{
            res.status(404).json({
                message: "Utilizador não encontrado"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

exports.listAll = listAll
exports.signUp = signUp
exports.signIn = signIn
