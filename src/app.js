const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// App
const app = express();
const authRoutes = require('./routes/auth.route')
const servicio = require('./routes/servicio.route');

//middelwares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//CROS

//prefijos o rutas
app.use('/api/auth', authRoutes);
app.use('/api/servicio', validateToken, servicio);
app.use('/api/reserva', validateToken, servicio);


//
function validateToken(req, res, next){
    const accessToken =req.headers['authorization'] || req.query.accessToken;
    if(!accessToken) res.send('Access denied');
    jwt.verify(accessToken, process.env.SECRET, (err, user) =>{
        if(err){
            res.send('Access denied, token expired or incorrect');
        }else{
            next();
        }
    });
}

module.exports = app ;

