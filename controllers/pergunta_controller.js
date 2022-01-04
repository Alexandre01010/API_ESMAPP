const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_pergunta');
const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Pergunta = Model.Pergunta;


const listAll = (req, res) => {
    Pergunta.findAll().then((clientesList) => {
        if (clientesList.length > 0) {
            res.status(200).json(clientesList)
        } else {
            res.status(204).send("sem resultados")
        }

    }).catch((error) => {
        res.status(400).send('Error');
    })
}

// const createPergunta = (req, res) => {
//     Pergunta.findAll({
//         where:{
//             texto: req.body.texto
//         }
//     }).then(per => {
//         if(per > 0){
//             res.status(400).json({
//                 message: "Essa pergunta já existe"
//             })
//         }else{
//             Pergunta.create({
//                 texto: req.body.texto,
//                 pontos: req.body.pontos,
//                 exposicaoId: req.params.idExposicao
//             }).then(pergunta => {
//                 res.status(201).json({
//                     message: "Pergunta criada com sucesso"
//                 })
//             }).catch(error => {
//                 res.status(500).send(error)
//             })
//         }
//     }).catch(error => {
//         res.status(500).send(error)
//     })
// }

const createPergunta = (req, res) => {
    Pergunta.findAll({
        where: {
            texto: req.body.texto
        }
    }).then(perg => {
        if (perg.length > 0) {
            res.status(400).json({
                message: "Essa pergunta já existe"
            })
        } else {
            Pergunta.create({
                texto: req.body.texto,
                pontos: req.body.pontos,
                exposicaoId: req.params.idExposicao
            }).then((perg) => {
                res.status(201).json({
                    message: "Pergunta criada com sucesso"
                })
            }).catch(error => {
                res.status(500).send("Internal Server Error")
            })
        }
    })
}

const editPergunta = (req, res) => {
    Pergunta.findAll({
        where: {
            id: req.params.idPergunta
        }
    }).then((pergunta) => {
        if (pergunta.length > 0) {
            Pergunta.update({
                texto: req.body.texto,
                pontos: req.body.pontos,
                exposicaoId: req.body.idExposicao
            }, {
                where: { id: req.params.idPergunta }
            }).then(data => {
                res.status(201).json({
                    message: "Pergunta alterada com sucesso"
                })
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Pergunta não encontrada"
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: error
        })
    })
}

const deletePergunta = (req, res) => {
    Pergunta.findAll({
        where: {
            id: req.params.idPergunta
        }
    }).then((pergunta) => {
        if (pergunta.length > 0) {
            Pergunta.destroy({
                where: {
                    id: req.params.idPergunta
                }
            }).then((perg) => {
                if (perg == 1) {
                    res.status(200).json({
                        message: "Pergunta eliminada com sucesso"
                    })
                }
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Pergunta com id " + req.params.idPergunta + " não foi encontrada!"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}



exports.listAll = listAll
exports.createPergunta = createPergunta
exports.editPergunta = editPergunta
exports.deletePergunta = deletePergunta