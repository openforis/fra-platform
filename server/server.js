const express = require('express')
const compression = require('compression')

const app = express()
const serverHttpPort = process.env.PORT || 9001

app.use(compression({threshold: 512}))
app.use('/', express.static(`${__dirname}/../dist`))

app.listen(serverHttpPort, (req, resp) => {
    console.log('FRA Platform server listening on port ', serverHttpPort)
})
