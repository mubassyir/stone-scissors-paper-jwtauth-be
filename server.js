const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT ||8081;

let corsOption = {
    origin : 'http://127.0.0.1:5500'
}

//Ejs Setting
app.set('view engine', 'ejs');

//cors and body parser
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Syc
db.sequelize.sync().then(()=>{
    console.log("Creating tables success . . . ")
}).catch((err)=>{
    console.log(err.message||"something wrong with credential data")
})

//call from routes
require("./app/routes/user.routes.js")(app); //Routes for user API
require("./app/routes/bio.routes.js")(app); //Routes for biodata API
require("./app/routes/history_routes.js")(app); //Routes for history API
require("./app/routes/dashboard.routes.js")(app); //Routes for Admin Page
require("./app/routes/player.routes.js")(app); //Routes for game play

app.listen(PORT,()=>{
    console.log(`server http://localhost/${PORT}/api/ running . . . `);
})