require("dotenv").config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const {PORT} = process.env;
const bodyParser = require('body-parser');
const path = require('path');



const accomRouter = require('./routes/accomRouter');
app.use('/accom', accomRouter);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.listen(PORT, () => {
    console.log(
        `App listening at http://localhost:${PORT}`,
    );
    });
