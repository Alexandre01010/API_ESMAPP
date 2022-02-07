const express = require('express')
const router = express.Router();
const controllerObras = require('../controllers/obra_controller')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /obra
 * @group Obras
 * @returns {object} 200 - An array of Obras info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route POST /obra/{idExposicao}
 * @group Obras
 * @param {object} object.body - Obra - eg. {"titulo": "Kizhinga", "metodoUsado": "Aguarelas", "dimensoes": "53x22cm", "QrCode":"dunno", pontos: 19,"img": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg=="}
* @param {string} idExposicao.path - id da Exposição
 * @returns {object} 200 - An array of Obras info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route PUT /obra/{idObra}
 * @group Obras
 * @param {string} idObra.path - id da Obra
 * @param {object} object.body - Obra - eg. {"titulo": "Um dia na praia ao sol","metodoUsado": "tinta pastel","dimensoes": "16x16","createdAt": "2022-01-25T02:05:45.000Z","updatedAt": "2022-01-25T02:05:45.000Z","exposicaoId": 14}
 * @returns {object} 200 OK
 * @returns {Error} 404 - Error array
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route GET /obra/{idExposicao}
 * @group Obras
 * @param {string} idExposicao.path - id da Exposição
 * @returns {object} 200 - An array of Obras info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */
/**
 * @route DELETE /obra/{idObra}
 * @group Obras
 * @param {string} idObra.path - id da Obra
 * @returns {object} 200 - An array of Obras info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */




router.get('/', function (req, res) {
    controllerObras.listAll(req, res);
})

router.route('/:idExposicao').post([
    body('pontos').notEmpty(),
    body('img').notEmpty(),
    body('titulo').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerObras.createObra(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idObra').put([
    body('pontos').notEmpty(),
    body('img').notEmpty(),
    body('titulo').notEmpty()
], function (req, res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        controllerObras.editObra(req, res)
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})

router.route('/:idExposicao').get(controllerObras.listObras)

router.route('/:idObra').delete(controllerObras.deleteObra)


module.exports = router