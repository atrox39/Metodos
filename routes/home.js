const bcrypt = require('bcrypt');
const route = require('express').Router();
const verifyNotLogin = require('../controllers/verifyNotLogin');
// Models
const Usuario = require('../database/models/usuario.model');

// Seccion de la ruta "/" [GET, POST]
route.get('/', verifyNotLogin, (req, res)=>{
    res.render('index', {success:req.flash('success'), error:req.flash('error')});
});

route.post('/', verifyNotLogin, async (req, res)=>{
    const {usuario, correo} = req.body;
    const dup = await Usuario.findOne({$or:[{usuario}, {correo}]});
    if(dup === null) // Si no encuentra una cuenta duplicada
    {
        const newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido.toLowerCase(),
            usuario: req.body.usuario,
            clave: bcrypt.hashSync(req.body.clave, 10), // Generamos un usuario con contraseña encriptada
            correo: req.body.correo
        };
        await Usuario.create(newUser);
        req.flash('success', 'Se creo el usuario correctamente');
        res.redirect('/');
    }else{ // Si encuentra una cuenta duplicada genera un error
        req.flash('error', 'Error, usuario y/o correo ya existentes');
        res.redirect('/');
    }
});

// Seccion de la ruta "/acceder" [GET, POST]

route.get('/acceder', verifyNotLogin, (req, res)=>{
    res.render('acceder', {success:req.flash('success'), error:req.flash('error')});
});

route.post('/acceder', verifyNotLogin, async (req, res)=>{
    const {usuario, clave} = req.body;
    const tempUsuario = await Usuario.findOne({usuario});
    if(tempUsuario !== null)
    {
        if(bcrypt.compareSync(clave, tempUsuario.clave))
        {
            req.session.usuario = tempUsuario;
            res.redirect('/panel');
        }
        else
        {
            req.flash("error", "Error, el usuario no esta registrado");
            res.redirect('/acceder');
        }
    }
    else
    { 
        req.flash("error", "Error, el usuario no esta registrado");
        res.redirect('/acceder'); 
    } 
});

module.exports = route;