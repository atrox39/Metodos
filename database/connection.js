const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.url);

const connection = mongoose.connection;
connection.on('open', ()=>{
    console.log("Success connection");
});

connection.on('error', (err)=>{
    if(err) throw err; // Evitamos que se ejecute el servidor si la base de datos no se conecta
});

module.exports = connection;