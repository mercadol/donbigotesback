const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// App
const app = express();
const authRoutes = require('./routes/auth.route')
const servicio = require('./routes/servicio.route');
const reserva = require('./routes/reserva.route');

//middelwares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//CROS
//CROS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//prefijos o rutas
app.use('/api/auth', authRoutes);
app.use('/api/servicio', validateToken, servicio);
app.use('/api/reserva',validateToken, reserva);


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

