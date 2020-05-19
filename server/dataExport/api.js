const DataExportRepository = require('./dataExportRepository')

module.exports.init = (app) => {
  app.get('/export/:table', async (req, res) => {
    const { countries, columns, variable } = req.query
    const { table } = req.params

    const result = await DataExportRepository.getExportData(table, variable, countries, columns)
    res.json(result)
  })
}
