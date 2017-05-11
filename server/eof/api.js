const eofRepository = require('./repository')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../requestUtils')

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {

    app.post('/api/country/:countryIso', (req, res) => {
        console.log('tmp dir:', os.tmpdir())
        fs.writeFileAsync(`${os.tmpdir()}/${req.params['countryIso']}.json`, JSON.stringify(req.body))
            .then(() => {
                res.json({})
            }).catch((err) => {
            console.log('Could not write file', err)
            res.status(500).json({error: 'Could not write country data'})
        })
    })

    app.get('/api/country/:countryIso', (req, res) => {
        fs.readFileAsync(`${os.tmpdir()}/${req.params['countryIso']}.json`)
            .then((data) => {
                return res.json(JSON.parse(data))
            }).catch((_) => {
            return res.json(forestAreaTableResponse)
        })
    })

    app.post('/api/country/originalDataPoint/draft/:countryIso', (req, res) => {
        if (!req.body.id) {
            eofRepository.insertDraft(req.params['countryIso'], req.body)
                .then(id => res.json({odpId: id}))
                .catch(err => sendErr(res, err))
        }
        else {
            eofRepository.updateDraft(req.body)
                .then(() => res.json({odpId: req.body.id}))
                .catch(err => sendErr(res, err))
        }
    })

    app.post('/api/country/originalDataPoint/draft/markAsActual/:opdId', (req, res) =>
        eofRepository.markAsActual(req.params.opdId)
            .then(
                () => res.json({}))
            .catch(err => sendErr(res, err))
    )
}