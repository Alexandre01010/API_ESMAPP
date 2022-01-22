const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_autor');
//const { where } = require('sequelize/dist');
const jwt = require('jsonwebtoken');
const Autor = Model.Autor;

const getAllAutor = (req, res) => {
    Autor.findAll().then(data => {
        if(data.length > 0 ){
            res.status(200).json(data)
        }else{
            res.status(404).json({
                message: "Não existem autores"
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const getAutorById = (req, res) => {
    Autor.findAll({
        where:{
            id: req.params.autorID
        }
    }).then(data => {
        if(data.length > 0){
            res.status(200).json(data)
        }else{
            res.status(404).json({
                message: "Não foi encontrado um autor com o id " + req.params.autorID
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

const createAutor = (req, res) => {
    Autor.findAll({
        where:{
            nome: req.body.nome
        }
    }).then(data => {
        if(data.length > 0){
            res.status(409).json({
                message: "Autor já existente"
            })
        }else{
            Autor.create({
                nome: req.body.nome,
                biografia: req.body.biografia
            }).then(autor => {
                res.status(201).json({
                    message: "Exposição criada com sucesso"
                })
            }).catch(err => {
                res.status(500).send(err)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

exports.createAutor = createAutor
exports.getAllAutor = getAllAutor
exports.getAutorById = getAutorById