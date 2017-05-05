const express     = require( 'express' )
const bodyParser  = require('body-parser')
const compression = require( 'compression' )

const initialData  = require('./initialState')

const os = require('os')
const fs = require('fs')

const app            = express()
const serverHttpPort = process.env.PORT || 9001

app.use( compression( { threshold: 512 } ) )
app.use( '/', express.static( `${__dirname}/../dist` ) )
app.use(bodyParser.json({limit: '5000kb'}))

app.post( '/api/data', ( req, res ) => {
    console.log(os.tmpdir())
    fs.writeFile(os.tmpdir() + '/italy.json', JSON.stringify(req.body), () => {
        res.send( 'ok' )
    })
})
app.get('/api/data/country/:countryId', (req, res) => {
   fs.readFile(os.tmpdir() + `/${req.params['countryId']}.json`, (err, data) => {
     if(err) {
       return res.send(JSON.stringify(initialData))
     }
       return res.send(data)
   })
})


app.listen( serverHttpPort, ( req, resp ) => {
    console.log( 'FRA Platform server listening on port ', serverHttpPort )
} )

