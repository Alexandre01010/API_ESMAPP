const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_exposicao');
const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Exposicao = Model.Exposicao;


const listAll = (req, res) => {
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

const createExpo = (req, res) => {
    Exposicao.findAll({
        where:{
            txtApresentacao: req.body.txtApresentacao
        }
    }).then(expo => {
        if(expo.length > 0){
            res.status(400).json({
                message: "Exposição com o texto de apresentação " + req.body.txtApresentacao + " já existe!" 
            })
        }else{
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
        where:{
           id: req.params.idExposicao 
        }
    }).then((expo) => {
        if(expo.length > 0){
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
                where:{ id: req.params.idExposicao }
            })
        }else{
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
        where:{
            id: req.params.idExposicao
        }
    }).then((expo) => {
        if(expo.length > 0){
            Exposicao.destroy({
                where:{
                    id: req.params.idExposicao
                }
            }).then((exp) => {
                if(exp == 1){
                    res.status(200).json({
                        message: "Exposição eliminada com sucesso"
                    })
                }
            }).catch(error => {
                res.status(500).send(error)
            })
        }else{
            res.status(404).json({
                message: "Exposição com id " +  req.params.idExposicao + " não foi encontrada!"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const getExposicaoFiltered = (req, res) => {

}

exports.listAll = listAll
exports.createExpo = createExpo
exports.editExpo = editExpo
exports.deleteExpo = deleteExpo
exports.getExposicaoFiltered = getExposicaoFiltered