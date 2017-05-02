const express = require('express')
const compression = require('compression')

const app = express()
const serverHttpPort = 9001

app.use(compression({threshold: 512}))
app.get('/', function (req, res) {
    res.send('Fra Platform')
})

app.listen(serverHttpPort, (req, resp) => {
    console.log('frap server listening on port ', serverHttpPort)
})
