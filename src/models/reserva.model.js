const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReservaSchema = Schema({
  codigo:{type: String, unique:true},
  idservicio:{
    ref:"Servicio",
    type: Schema.Types.ObjectId
    },
  idcolaborador:{
    ref:"Usuario",
    type: Schema.Types.ObjectId
    },
  idcliente:{
    ref:"Usuario",
    type: Schema.Types.ObjectId
    },
  estado:String,
  fecha:{type:Date, default:Date.now, unique: true},
  calificacion:Number,
  resenias:String
});

module.exports = mongoose.model('Reserva', ReservaSchema);

