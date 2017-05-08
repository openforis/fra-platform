const express     = require( 'express' )
const bodyParser  = require('body-parser')
const compression = require( 'compression' )
const os          = require('os')
const Promise     = require('bluebird')
const fs          = Promise.promisifyAll(require('fs'))

const initialData    = require('./initialState')
const app            = express()
const serverHttpPort = process.env.PORT || 9001

app.use( compression( { threshold: 512 } ) )
app.use( '/', express.static( `${__dirname}/../dist` ) )
app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use(bodyParser.json({limit: '5000kb'}))

app.post( '/api/country/:countryIso', ( req, res ) => {
    console.log('tmp dir:', os.tmpdir())
    fs.writeFileAsync(`${os.tmpdir()}/${req.params['countryIso']}.json`, JSON.stringify(req.body))
        .then(() => {
            res.send({})
        }).catch((err) => {
            console.log('Could not write file', err)
            res.status(500).send({error: 'Could not write country data'})
        })
})
app.get('/api/country/:countryIso', (req, res) => {
   fs.readFileAsync(`${os.tmpdir()}/${req.params['countryIso']}.json`)
       .then((data) => {
         return res.send(data)
        }).catch((_) => {
           return res.send(JSON.stringify(initialData))
       })
})

app.listen( serverHttpPort, ( req, resp ) => {
    console.log( 'FRA Platform server listening on port ', serverHttpPort )
})
