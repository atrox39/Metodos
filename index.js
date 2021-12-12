const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const session = require('express-session');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
require('./database/connection');

app.engine(".hbs", hbs.engine({
    layoutsDir: path.join(__dirname, 'views', 'templates'),
    defaultLayout: 'master',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret:"palabra-secreta",
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

// Routes
app.use(require('./routes/home'));
app.use('/panel', require('./routes/panel'));

app.listen(port, ()=>{
    console.log("Express Server");
});