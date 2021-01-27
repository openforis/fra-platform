// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
const util = require('util')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'JSZip'.
const JSZip = require('jszip')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ExportServ... Remove this comment to see the full error message
const ExportService = require('../assessment/service/exportService')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')
const DataExportRepository = require('./dataExportRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Request'.
const Request = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'panEuropea... Remove this comment to see the full error message
const panEuropean = (assessmentType: any) => (assessmentType === 'panEuropean' ? 'pan_european' : null)
module.exports.init = (app: any) => {
  app.get('/export/:assessmentType/:section', async (req: any, res: any) => {
    try {
      const { countries, columns, variables } = req.query
      const { assessmentType, section } = req.params
      const schemaName = panEuropean(assessmentType) || (await VersionService.getDatabaseSchema(req))
      const result = await DataExportRepository.getExportData(schemaName, section, variables, countries, columns)
      res.json(result)
    } catch (err) {
      ;(Request as any).sendErr(res, err)
    }
  })
  app.get('/export/bulk-download', async (req: any, res: any) => {
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
      ;(Request as any).sendErr(res, err)
    }
  })
}
