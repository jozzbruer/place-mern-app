const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (request, response, next) => {
    response.send('Test the server shit')
})

module.exports = app