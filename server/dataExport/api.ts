const path = require('path')
const fs = require('fs')
const util = require('util')

const JSZip = require('jszip')

const ExportService = require('../assessment/service/exportService')
const VersionService = require('../versioning/service')

const DataExportRepository = require('./dataExportRepository')
const Request = require('../utils/requestUtils')

const panEuropean = (assessmentType) => (assessmentType === 'panEuropean' ? 'pan_european' : null)

module.exports.init = (app) => {
  app.get('/export/:assessmentType/:section', async (req, res) => {
    try {
      const { countries, columns, variables } = req.query
      const { assessmentType, section } = req.params
      const schemaName = panEuropean(assessmentType) || (await VersionService.getDatabaseSchema(req))

      const result = await DataExportRepository.getExportData(schemaName, section, variables, countries, columns)
      res.json(result)
    } catch (err) {
      Request.sendErr(res, err)
    }
  })

  app.get('/export/bulk-download', async (req, res) => {
    try {
      const files = await ExportService.exportData(ExportService.EXPORT_TYPE.CSV, false)

      const zip = new JSZip()

      // Include README.txt in the zipfile

      const readFile = util.promisify(fs.readFile)
      const readmeFileName = 'README.txt'
      const readmeContent = await readFile(path.resolve(__dirname, `./${readmeFileName}`))

      zip.file(readmeFileName, readmeContent)
      Object.values(files).forEach(({ fileName, content }) => zip.file(fileName, content))

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
