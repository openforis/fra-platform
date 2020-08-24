const JSZip = require('jszip')

const ExportService = require('../assessment/service/exportService')
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

  app.get('/export/FRA-bulk-download', async (req, res) => {
    try {
      const files = await ExportService.exportData(ExportService.EXPORT_TYPE.CSV, true)

      const zip = new JSZip()
      Object.values(files).forEach((file) => zip.file(file.fileName, file.content))
      zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(res)
        .on('finish', function () {
          res.end()
        })
    } catch (err) {
      Request.sendErr(res, err)
    }
  })
}
