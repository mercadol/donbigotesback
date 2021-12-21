const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();




const controller ={
    sigup: async (req, res)=>{
        try{
        const {cedula, userName, password, name, role}= req.body;
        Usuario.find({cedula})
        const newUsuario= new Usuario({
            cedula,
            userName,
            password: await Usuario.encryptPassword(password),
            name
        });
        
        const savedUser = await newUsuario.save();
        // Create a token
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400, // 24 hours
        });
        return res.status(200).json({ token });
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);
        }
    },
    sigin: (req, res)=>{
    const {username, password}= req.body
    const user = { username:username };
    const accessToken = generateAccessToken(user);
    res.header('authorization', accessToken).json({
        message: 'Usuario autenticado',
        token: accessToken
    });
    }
};

function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET, {expiresIn: '5m'})
}


module.exports = controller;
