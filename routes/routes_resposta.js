const express = require('express')
const router = express.Router();
const controllerRespostas = require('../controllers/resposta_controller')
const { validationResult, body } = require('express-validator')


/**
 * @route GET /resposta
 * @group Respostas
 * @returns {object} 200 - An array of Respostas info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route POST /resposta/{idPergunta}
 * @group Respostas
 * @param {string} idPergunta.path - id da Pergunta
 * @param {object} object.body - Resposta - eg. {"texto": "1992", "veracidade": true}
 * @returns {object} 200 OK
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route PUT /resposta/{idResposta}
 * @group Respostas
 * @param {string} idResposta.path - id da Resposta
 * @param {object} object.body - Resposta - eg. {"texto": "1992", "veracidade": true}
 * @returns {object} 200 OK
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route DELETE /resposta/{idResposta}
 * @group Respostas
 * @param {string} idResposta.path - id da Resposta
 * @returns {object} 200 OK
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */



router.get('/', function (req, res) {
    controllerRespostas.listAll(req, res);
})

router.route('/:idPergunta').post([
    body('texto').notEmpty(),
    body('veracidade').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerRespostas.createResposta(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idResposta').put(controllerRespostas.editResposta)
router.route('/:idResposta').delete(controllerRespostas.deleteResposta)
module.exports = router