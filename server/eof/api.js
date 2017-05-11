const eofRepository = require('./repository')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../requestUtils')

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {

    app.post('/api/country/:countryIso/:year', (req, res) => {
        eofRepository.persistFraForestArea(req.params.countryIso, req.params.year, req.body.forestArea)
            .then(() => res.json({}))
            .catch(err => sendErr(res, err))
    })

    app.get('/api/country/:countryIso', (req, res) => {
        fs.readFileAsync(`${os.tmpdir()}/${req.params.countryIso}.json`)
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