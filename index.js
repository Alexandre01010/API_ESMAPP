require('dotenv').config();
const express = require('express')
const { Sequelize } = require('sequelize');
const app = express();
const port = process.env.PORT || 3000;
const utilities = require('./utilities/utilities')
const router_user = require('./routes/routes_user')
const router_notificacao = require('./routes/routes_notificacao')
const router_exposicao = require('./routes/routes_exposicao')
const router_obra = require('./routes/routes_obra')
const router_pergunta = require('./routes/routes_pergunta')
const router_resposta = require('./routes/routes_resposta')
const router_loja=require('./routes/routes_loja')




const auth = function (req, res, next) {
    let exceptions = ['/','/exposicao'];
    if (exceptions.indexOf(req.url) >= 0) {
        next();
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if (result) {
                next();
            } else {
                res.status(401).send("Invalid Token");
            }
        })
    }
}



app.use(express.json());
app.use(auth);



app.use('/', router_user);
app.use('/notificacao', router_notificacao)
app.use('/exposicao', router_exposicao)
app.use('/obra', router_obra)
app.use('/pergunta', router_pergunta)
app.use('/resposta', router_resposta)
app.use('/loja',router_loja)


app.listen(port, function () {
    console.log("App is running on port " + port)
})