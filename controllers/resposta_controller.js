const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_resposta');
//const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Resposta = Model.Resposta;


const listAll = (req, res) => {
    Resposta.findAll().then((clientesList) => {
        if (clientesList.length > 0) {
            res.status(200).json(clientesList)
        } else {
            res.status(404).json({
                message: "Sem resultados"
            })
        }

    }).catch((error) => {
        res.status(400).send('Error');
    })
}

const createResposta = (req, res) => {
    Resposta.findAll({
        where: {
            texto: req.body.texto
        }
    }).then(resposta => {
        if (resposta.length > 0) {
            res.status(400).json({
                message: "Essa resposta já existe"
            })
        } else {
            Resposta.create({
                texto: req.body.texto,
                veracidade: req.body.veracidade,
                perguntumId: req.params.idPergunta
            }).then((resp) => {
                res.status(201).json({
                    message: "Resposta criada com sucesso"
                })
            }).catch(error => {
                res.status(500).send("Internal Server Error")
            })
        }
    })
}

const editResposta = (req, res) => {
    Resposta.findAll({
        where: {
            id: req.params.idResposta
        }
    }).then((resposta) => {
        if (resposta.length > 0) {
            Resposta.update({
                texto: req.body.texto,
                veracidade: req.body.veracidade,
                perguntumId: req.body.perguntaId
            }, {
                where: { id: req.params.idResposta }
            }).then(data => {
                res.status(201).json({
                    message: "Resposta alterada com sucesso"
                })
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Resposta não encontrada"
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: error
        })
    })
}

const deleteResposta = (req, res) => {
    Resposta.findAll({
        where: {
            id: req.params.idResposta
        }
    }).then((resposta) => {
        if (resposta.length > 0) {
            Resposta.destroy({
                where: {
                    id: req.params.idResposta
                }
            }).then((resp) => {
                if (resp == 1) {
                    res.status(200).json({
                        message: "Resposta eliminada com sucesso"
                    })
                }
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Resposta com id " + req.params.idPergunta + " não foi encontrada!"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

exports.listAll = listAll
exports.createResposta = createResposta
exports.editResposta = editResposta
exports.deleteResposta = deleteResposta