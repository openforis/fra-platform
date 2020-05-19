const DataExportRepository = require('./dataExportRepository')

module.exports.init = (app) => {
  app.get('/export/:table', async (req, res) => {
    // const { query } = req.query
    // const { countries, columns, variable } = JSON.parse(query)
    // const { table } = req.params

    // Test, Example
    const countries = ['ABW', 'X01']
    const columns = ['1990']
    const variable = 'forest_area'
    const table = 'extentOfForest'

    // const result = await DataExportRepository.getExportData(table, variable, JSON.parse(countries), JSON.parse(columns))
    const result = await DataExportRepository.getExportData(table, variable, countries, columns)
    res.json(result)
  })
}
