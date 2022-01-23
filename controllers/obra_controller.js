const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const ModelObra = require('../models/model_obra');
const ModelExposicao = require('../models/model_exposicao')
//const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Obra = ModelObra.Obra;
const Exposicao = ModelExposicao.Exposicao;
var QRCode = require('qrcode')


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

const listObras = (req, res) => {
    if (req.params.idExposicao) {
        Obra.findAll({
            where: {
                exposicaoId: req.params.idExposicao
            }
        }).then(data => {
            if (data.length > 0) {
                Obra.findAll().then(obras => {
                    if (obras.length > 0) {
                        res.status(200).json(obras)
                    } else {
                        res.status(404).json({
                            message: "Não existem obras dessa exposição"
                        })
                    }
                }).catch(error => {
                    res.status(500).send(error)
                })
            }
        }).catch(error => {
            res.status(500).send(error)
        })
    } else {
        Obra.findAll().then((data) => {
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                res.status(204).send("sem resultados")
            }

        }).catch((error) => {
            res.status(400).send('Error');
        })
    }
}

// const createObra = (req, res) => {
//     Obra.findAll({
//         where: {
//             titulo: req.body.titulo
//         }
//     }).then(obra => {
//         if (obra.length > 0) {
//             res.status(400).json({
//                 message: "Essa obra já existe!"
//             })
//         } else {
//             Obra.create({
//                 QrCode: req.body.QrCode,
//                 pontos: req.body.pontos,
//                 img: req.body.img,
//                 titulo: req.body.titulo,
//                 metodoUsado: req.body.metodoUsado,
//                 dimensoes: req.body.dimensoes,
//                 exposicaoId: req.params.idExposicao
//             }).then(ob => {
//                 res.status(201).json({
//                     message: "Obra criada com sucesso"
//                 })
//             }).catch(error => {
//                 res.status(500).send(error)
//             })
//         }
//     })
// }

const createObra = (req, res) => {
    Exposicao.findAll({
        where: {
            id: req.params.idExposicao
        }
    }).then(expo => {
        if (expo.length > 0) {
            Obra.findAll({
                where: {
                    titulo: req.body.titulo
                }
            }).then(obra => {
                if (obra.length > 0) {
                    res.status(400).json({
                        message: "Essa Obra já existe"
                    })
                } else {
                    QRCode.toDataURL(req.body.titulo, function (err, url) {
                        Obra.create({
                            qrCode: url,
                            pontos: req.body.pontos,
                            img: req.body.img,
                            titulo: req.body.titulo,
                            metodoUsado: req.body.metodoUsado,
                            dimensoes: req.body.dimensoes,
                            exposicaoId: req.params.idExposicao
                        }).then(ob => {
                            res.status(201).json({
                                message: "Obra criada com sucesso"
                            })
                        }).catch(error => {
                            res.status(500).send(error)
                        })

                    })
                }
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Exposição não encontrada!"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const editObra = (req, res) => {
    Obra.findAll({
        where: {
            id: req.params.idObra
        }
    }).then(obra => {
        if (obra.length > 0) {
            Obra.update({
                QrCode: req.body.QrCode,
                pontos: req.body.pontos,
                img: req.body.img,
                titulo: req.body.titulo,
                metodoUsado: req.body.metodoUsado,
                dimensoes: req.body.dimensoes,
                exposicaoId: req.body.exposicao
            }, {
                where: {
                    id: req.params.idObra
                }
            }).then(data => {
                res.status(201).json({
                    message: "Obra alterada com sucesso"
                })
            }).catch(err => {
                res.status(500).send(err)
            })
        } else {
            res.status(404).json({
                message: "Obra não encontrada"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const deleteObra = (req, res) => {
    Obra.findAll({
        where: {
            id: req.params.idObra
        }
    }).then(obra => {
        if (obra.length > 0) {
            Obra.destroy({
                where: {
                    id: req.params.idObra
                }
            }).then(data => {
                res.status(200).json({
                    message: "Obra eliminada com sucesso"
                })
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.status(404).json({
                message: "Obra não encontrada"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

exports.listAll = listAll
exports.createObra = createObra
exports.editObra = editObra
exports.deleteObra = deleteObra
exports.listObras = listObras