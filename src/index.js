const mongoose = require('mongoose');
const app = require('./app');
//const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.Promise= global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/donbigotesapi', { useNewUrlParser: true })
      .then(()=>{
        console.log('La conexion a la base de datos se a realizado bien!!');
        //creamos el servidor y ponemos las peticiones https
        app.listen(process.env.PORT,() =>{
          console.log('servidor corriendo en http://localhost:'+process.env.PORT);
        });
      });





