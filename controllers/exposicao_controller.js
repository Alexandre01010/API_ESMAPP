const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_exposicao');
const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Exposicao = Model.Exposicao;


// const listAll = (req, res) => {
//     Exposicao.findAll().then((clientesList) => {
//         if (clientesList.length > 0) {
//             res.status(200).json(clientesList)
//         } else {
//             res.status(204).send("sem resultados")
//         }

//     }).catch((error) => {
//         res.status(400).send('Error');
//     })
// }

const createExpo = (req, res) => {
    Exposicao.findAll({
        where: {
            txtApresentacao: req.body.txtApresentacao
        }
    }).then(expo => {
        if (expo.length > 0) {
            res.status(400).json({
                message: "Exposição com o texto de apresentação " + req.body.txtApresentacao + " já existe!"
            })
        } else {
            Exposicao.create({
                QrCode: req.body.QrCode,
                pontos: req.body.pontos,
                nomeAutor: req.body.nomeAutor,
                numeroPiso: req.body.numeroPiso,
                txtApresentacao: req.body.txtApresentacao,
                img: req.body.img,
                dataInicio: req.body.dataInicio,
                dataFim: req.body.dataFim
            }).then((exp) => {
                res.status(201).json({
                    message: "Exposição criada com sucesso"
                })
            }).catch(error => {
                res.status(500).send("Internal Server Error")
            })
        }
    })
}

const editExpo = (req, res) => {
    Exposicao.findAll({
        where: {
            id: req.params.idExposicao
        }
    }).then((expo) => {
        if (expo.length > 0) {
            Exposicao.update({
                QrCode: req.body.QrCode,
                pontos: req.body.pontos,
                nomeAutor: req.body.nomeAutor,
                numeroPiso: req.body.numeroPiso,
                txtApresentacao: req.body.txtApresentacao,
                img: req.body.img,
                dataInicio: req.body.dataInicio,
                dataFim: req.body.dataFim
            }, {
                where: { id: req.params.idExposicao }
            })
        } else {
            res.status(404).json({
                message: "Exposição com o id " + req.params.idExposicao + " não encontrada"
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: error
        })
    })
}

const deleteExpo = (req, res) => {
    Exposicao.findAll({
        where: {
            id: req.params.idExposicao
        }
    }).then((expo) => {
        if (expo.length > 0) {
            Exposicao.destroy({
                where: {
                    id: req.params.idExposicao
                }
            }).then((exp) => {
                if (exp == 1) {
                    res.status(200).json({
                        message: "Exposição eliminada com sucesso"
                    })
                }
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Exposição com id " + req.params.idExposicao + " não foi encontrada!"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const getExposicaoFiltered = (req, res) => {
    if (req.query.seacrhText || req.query.piso) {
        const whitelist = ['searchText', 'piso']
        let condition = {}
        Object.keys(req.query).forEach(function (key) {
            if (key == "searchText") {
                condition.txtApresentacao = { [Op.like]: `%${req.query[key]}%` }
            }
            if (key == "piso") {
                condition.piso = parseInt(req.query[key])
            }
        })
        Exposicao.findAll({
            where: {
                condition
            }
        }).then(expo => {
            if (expo.length > 1) {
                res.status(200).json(expo)
            } else {
                res.status(404).json({
                    message: "Exposição não encontrada"
                })
            }
        }).catch(error => {
            res.status(500).send(error)
        })
    } else {
        Exposicao.findAll().then((clientesList) => {
            if (clientesList.length > 0) {
                res.status(200).json(clientesList)
            } else {
                res.status(204).send("sem resultados")
            }

        }).catch((error) => {
            res.status(400).send('Error');
        })
    }

}

exports.listAll = listAll
exports.createExpo = createExpo
exports.editExpo = editExpo
exports.deleteExpo = deleteExpo
exports.getExposicaoFiltered = getExposicaoFiltered

exports.findPropostasFiltered = (req, res) => {
    if (req.query.type || req.query.state || req.query.text) {
        const whitelist = ['type', 'state', 'text'];
        let condition = {};
        Object.keys(req.query).forEach(function (key) {
            if (!whitelist.includes(key))
                return; //inform user of BAD REQUEST           
            if (key == "type") {
                if (req.query[key] == "estagio") {
                    condition.email = { [Op.not]: null }
                } else {
                    if (req.query[key] == "projeto") {
                        condition.email = { [Op.is]: null }
                    }
                }
            }
            if (key == "text")
                condition.titulo = { [Op.like]: `%${req.query[key]}%` }
            if (key == "state") {
                condition.id_tipo_estado = parseInt(req.query[key])
            }
        });
        Proposta.findAll({
            where: condition
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err.message || "Ocorreu um erro ao encontrar propostas"
                });
            });
    }
    else {
        Proposta.findAll(req.body)
            .then(data => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json({
                    message:
                        err.message || "Ocorreu um erro ao encontrar propostas",
                });
            });
    }
}