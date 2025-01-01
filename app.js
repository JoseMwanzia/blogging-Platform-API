const express = require('express');
const router = require('./app/routes/postRoutes')
require('dotenv').config();
const app = express();
const port = process.env.DB_PORT

app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log(`App serving @ http://localhost:${port}`)
})
