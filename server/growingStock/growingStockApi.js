const {getFraValues} = require('../eof/api')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  app.get('/growingStock/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    getFraValues('foc', req.params.countryIso)
      .then(fra => res.json(fra))
      .catch(err => sendErr(res, err))
  })

}
