const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var UsuarioSchema = Schema({
  cedula:{type: Number, unique:true},
  userName:{type: String, unique:true},
  password:String,
  name:String,
  role:{
    ref:"Role",
    type: Schema.Types.ObjectId
  }
},
{timestamps:true, versionkey: false});

UsuarioSchema.statics.encryptPassword = async (password) =>{
  const salt= await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
UsuarioSchema.statics.comparePassword = async (password, recivedPassword) =>{
  return await bcrypt.compare(password, receivedPassword);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
