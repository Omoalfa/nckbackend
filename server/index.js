const express = require('express');
const cors = require('cors');
const routes = require('./routes/api/v1');
const mongoose = require('mongoose');

require('dotenv').config()


const app = express();

app.use(cors());


app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
console.log("connected to db successfully");
});

module.exports = app;

