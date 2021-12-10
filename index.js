require('dotenv').config();
const express = require('express')
const { Sequelize } = require('sequelize');
const app = express();
const port = process.env.PORT || 3000;
const utilities = require('./utilities/utilities')


const auth = function(req, res, next) {
    let exceptions = ['/']; 
    if(exceptions.indexOf(req.url) >= 0) {
        next(); 
    } else {
        utilities.validateToken(req.headers.authorization, (result) => {
            if(result) {
                next(); 
            } else {
                res.status(401).send("Invalid Token"); 
            }
        })
    }
}



app.use(express.json());
app.use(auth); 

app.listen(port, function () {
    console.log("App is running on port " + port)
})