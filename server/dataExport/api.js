const DataExportRepository = require('./dataExportRepository')
const Request = require('../utils/requestUtils')

module.exports.init = (app) => {
  app.get('/export/:table', async (req, res) => {
    try {
      const { countries, columns, variable } = req.query
      const { table } = req.params

      const result = await DataExportRepository.getExportData(table, variable, countries, columns)
      res.json(result)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })
}
