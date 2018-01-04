const R = require('ramda')

const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {

  app.post('/panEuropean/upload/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    console.log(req.files)
    try {

    } catch (err) {
      sendErr(res, err)
    }
  })
}
