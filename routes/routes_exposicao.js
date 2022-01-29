const express = require('express')
const router = express.Router();
const controllerExposicoes = require('../controllers/exposicao_controller')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /exposicao
 * @group Exposições
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route POST /exposicao/
 * @group Exposições
 * @param {object} object.body - Exposição - eg. {"txtApresentacao": "O amor é fogo que arde sem se ver", "biografia": "O rato roeu a rolha do outro rato do rei da rússia", "QrCode":"dunno", pontos: 19, "tituloExposicao": "The Witch", "numeroPiso": 9, "dataInicio": "21-03-2020", "dataFim": "22-03-2020","img": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg=="}
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route PUT /obra/{idExposicao}
 * @group Exposições
 * @param {string} idExposicao.path - id da Exposição
 * @returns {object} 200 OK
 * @returns {Error} 404 - Error array
 * @security Bearer
 */
/**
 * @route DELETE /obra/{idExposicao}
 * @group Exposições
 * @param {string} idExposicao.path - id da Exposição
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route GET /exposicao/temporaria
 * @group Exposições
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route GET /exposicao/permanente
 * @group Exposições
 * @returns {object} 200 - An array of Exposições info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */


router.get('/', function (req, res) {
    controllerExposicoes.getExposicaoFiltered(req, res);
})

router.route('/').post([
    //body('nomeAutor').notEmpty(),
    //body('pontos').notEmpty(),
    body('txtApresentacao').notEmpty(),
    body('numeroPiso').notEmpty()
], function (req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        controllerExposicoes.createExpo(req, res)
    }else{
        res.status(404).json({errors: errors.array()})
    }
})

router.route('/:idExposicao').put([
    //body('nomeAutor').notEmpty(),
    body('pontos').notEmpty(),
    body('txtApresentacao').notEmpty(),
    body('QrCode').notEmpty(),
    body('numeroPiso').notEmpty()
], function (req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        controllerExposicoes.editExpo(req, res)
    }else{
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idExposicao').delete(controllerExposicoes.deleteExpo)

router.route('/temporaria').get(controllerExposicoes.getTemporaryExpositions)

router.route('/permanente').get(controllerExposicoes.getPermanentExpositions)


module.exports=router