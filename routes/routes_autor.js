const express = require('express')
const router = express.Router();
const controllerAutores = require('../controllers/autor_controller')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /autor
 * @group Autores
 * @returns {object} 200 - An array of Autores info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
 

 /**
  * @route GET /autor/{autorID}
  * @group Autores
  * @param {string} autorID.path - Autor name.
  * @returns {object} 200 - An array of Autores info
  * @returns {Error} 400 - Unexpected error
  * @returns {Error} 401 - Invalid Token
  * @security Bearer
  */
 
 
 /**
  * @route POST /autor/
  * @group Autores
  * @param {object} object.body - Autor - eg. {"nome": "Joaquim", "biografia": "O rato roeu a rolha do outro rato do rei da rússia"}
  * @returns {object} 200 - An array of Autores info
  * @returns {Error} 400 - Unexpected error
  * @returns {Error} 401 - Invalid Token
  * @security Bearer
  */
 


router.route('/').get(controllerAutores.getAllAutor)

router.route('/:autorID').get(controllerAutores.getAutorById)

router.route('/').post([
    body('nome').notEmpty(),
    body('biografia').notEmpty(),
], function (req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        controllerAutores.createAutor(req, res)
    }else{
        res.status(404).json({errors: errors.array()})
    }
})

module.exports=router
