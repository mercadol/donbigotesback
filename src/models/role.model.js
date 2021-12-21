const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoleSchema = Schema({
  name:String
},
{
  versionkey:false
});

module.exports = mongoose.model('Role', RoleSchema);
