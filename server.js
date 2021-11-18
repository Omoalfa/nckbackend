const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = require('./server/index.js');
const express = require('express');

require('dotenv').config()


app.prepare()
    .then(() => {
        server.use(express.json({ limit: '10mb' }))

        server.use(express.urlencoded({ extended: true }))

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        const PORT = process.env.PORT || 3001

        server.listen(PORT, () => {
            console.log('App listening on port ' + PORT);
        })
    })
    .catch((err) => {
        console.error(err);
    })