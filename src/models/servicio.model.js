const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ServicioSchema = Schema({
  codigo:{type: String, unique:true},
  name:String,
  costo:Number,
  genero: String,
  duracion:String,
  descripcion:String
});

module.exports = mongoose.model('Servicio', ServicioSchema);

