const route = require('express').Router();
const verifyLogin = require('../controllers/verifyLogin');
const Proyecto = require('../database/models/proyecto.model');

route.get('/', verifyLogin, async (req, res)=>{
    const proyectos = await Proyecto.find({usuario:req.session.usuario._id}).lean();
    res.render('panel/index', {proyectos, layout:'panel'});
});

route.get('/cerrarSesion', verifyLogin, (req, res)=>{
    req.session.destroy();
    res.redirect('/');
});

// Ruta '/agregar' [GET, PUT]

route.get('/agregar', verifyLogin, (req, res)=>{
    res.render('panel/agregar', {success:req.flash('success'), error:req.flash('error'), layout:'panel'});
});

route.put('/agregar', verifyLogin, async (req, res)=>{
    const userID = req.session.usuario._id;
    const {nombre, descripcion} = req.body;
    if(nombre!='' && descripcion != '')
    {
        await Proyecto.create({nombre, descripcion, usuario:userID});
        req.flash("success", "Se creo el proyecto");
        res.redirect('/panel/agregar');
    }
    else
    {
        req.flash("error", "Faltan datos en el formulario");
        res.redirect('/panel/agregar');
    }
});

// Ruta '/eliminar' [GET, DELETE]
route.get('/eliminar/:id', verifyLogin, async (req, res)=>{
    const proyecto = await Proyecto.findOne({_id:req.params.id, usuario:req.session.usuario._id}).lean();
    res.render('panel/eliminar', {layout:'panel', proyecto});
});

route.delete("/eliminar/:id", verifyLogin, async (req, res)=>{
    await Proyecto.findOneAndDelete({_id:req.params.id, usuario:req.session.usuario._id});
    res.redirect('/panel');
});

// Ruta '/editar' [GET, UPDATE]
route.get('/editar/:id', verifyLogin, async (req, res)=>{
    const proyecto = await Proyecto.findOne({_id:req.params.id, usuario:req.session.usuario._id}).lean();
    res.render('panel/editar', {layout:'panel', proyecto});
});

route.post('/editar/:id', verifyLogin, async (req, res)=>{
    const {nombre, descripcion} = req.body;
    await Proyecto.findOneAndUpdate({_id:req.params.id, usuario:req.session.usuario._id}, {nombre, descripcion});
    res.redirect('/panel');
});

// Ruta '/detalles' [GET]

route.get('/detalles/:id', verifyLogin, async (req, res)=>{
    const autor = req.session.usuario;
    const proyecto = await Proyecto.findOne({_id:req.params.id, usuario:req.session.usuario._id}).lean();
    res.render('panel/detalles', {layout:'panel', proyecto, autor});
});

module.exports = route;