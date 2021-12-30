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

exports.listAll = listAll
exports.createExpo = createExpo