const {Schema, model} = require('mongoose');

const usuario = new Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:100
    },
    apellido:{
        type:String,
        required:true
    },
    usuario:{
        type:String,
        required:true,
        maxlength:40
    },
    clave:{
        type:String,
        required:true,
        maxlength:60
    },
    correo:{
        type:String,
        required:true,
        maxlength:100
    }
},
{
    timestamps:true
});

module.exports = model("usuario", usuario);