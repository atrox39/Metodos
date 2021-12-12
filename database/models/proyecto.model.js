const {Schema, model} = require('mongoose');

const proyecto = new Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:100
    },
    descripcion:{
        type:String,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"usuario"
    }
},
{
    timestamps:true
});

module.exports = model("proyecto", proyecto);