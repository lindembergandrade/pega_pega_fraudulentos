const express = require('express')
const webApp = express()
const webServer = require('http').createServer(webApp)

webApp.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})


webServer.listen(3000, function () {
    console.log('> Server listening on port:', 3000)
});