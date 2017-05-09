const express     = require( 'express' )
const bodyParser  = require( 'body-parser' )
const compression = require( 'compression' )
const os          = require( 'os' )
const Promise     = require( 'bluebird' )
const fs          = Promise.promisifyAll( require( 'fs' ) )

require( 'dotenv' ).config()

const forestAreaTableResponse = require( './forestAreaTableResponse' )
const app                     = express()

app.use( compression( { threshold: 512 } ) )
app.use( '/', express.static( `${__dirname}/../dist` ) )
app.use( '/img/', express.static( `${__dirname}/../web-resources/img` ) )
app.use( bodyParser.json( { limit: '5000kb' } ) )

app.post( '/api/country/:countryIso', ( req, res ) => {
    console.log( 'tmp dir:', os.tmpdir() )
    fs.writeFileAsync( `${os.tmpdir()}/${req.params[ 'countryIso' ]}.json`, JSON.stringify( req.body ) )
        .then( () => {
            res.json( {} )
        } ).catch( ( err ) => {
        console.log( 'Could not write file', err )
        res.status( 500 ).json( { error: 'Could not write country data' } )
    } )
} )

app.get( '/api/country/:countryIso', ( req, res ) => {
    fs.readFileAsync( `${os.tmpdir()}/${req.params[ 'countryIso' ]}.json` )
        .then( ( data ) => {
            return res.json( JSON.parse( data ) )
        } ).catch( ( _ ) => {
        return res.json( forestAreaTableResponse )
    } )
} )

app.post( '/api/country/originalDataPoint/draft/:countryIso', ( req, res ) => res.json( {} ) )

app.listen( process.env.PORT, () => {
    console.log( 'FRA Platform server listening on port ', process.env.PORT )
} )
