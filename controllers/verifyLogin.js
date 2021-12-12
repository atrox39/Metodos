module.exports = (req, res, next)=>{
    if(req.session.usuario !== undefined)
        next();
    else{
        req.flash("error", "Aun no accede, inicie sesión para continuar");
        res.redirect('/acceder');
    }
};