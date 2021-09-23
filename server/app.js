require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('uploads'));

mongoose.connect(DB_URI,
    err => {
        if(err) throw err;
        console.log('Connection Successfull')
    });

app.use('/', require('./routes/routes'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));