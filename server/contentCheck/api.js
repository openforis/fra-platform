const Request = require('../utils/requestUtils')
const ContentCheckRepository = require('./contentCheckRepository')

const sections = {
  extent: ContentCheckRepository.getExtent,
}

module.exports.init = (app) => {
  app.get('/contentCheck/:countryIso/:section', async (req, res) => {
    try {
      const { countryIso, section } = req.params
      const result = await sections[section](countryIso)
      res.json(result)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })
}
