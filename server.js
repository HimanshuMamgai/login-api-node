require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", error => console.log(error.message));

db.once("open", () => {console.log('Connected to database successfully!')});

app.use('/auth', authRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});