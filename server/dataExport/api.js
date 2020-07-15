const VersionService = require('../versioning/service')

const DataExportRepository = require('./dataExportRepository')
const Request = require('../utils/requestUtils')

const panEuropean = (assessmentType) => (assessmentType === 'panEuropean' ? 'pan_european' : null)

module.exports.init = (app) => {
  app.get('/export/:assessmentType/:section', async (req, res) => {
    try {
      const { countries, columns, variable } = req.query
      const { assessmentType, section } = req.params
      const schemaName = panEuropean(assessmentType) || (await VersionService.getDatabaseSchema(req))

      const result = await DataExportRepository.getExportData(schemaName, section, variable, countries, columns)
      res.json(result)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })
}
