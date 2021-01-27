import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'
import * as JSZip from 'jszip'
import * as ExportService from '../assessment/service/exportService'
import * as VersionService from '../versioning/service'
import * as DataExportRepository from './dataExportRepository'
import * as Request from '../utils/requestUtils'

const panEuropean = (assessmentType: any) => (assessmentType === 'panEuropean' ? 'pan_european' : null)
export const init = (app: any) => {
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
      const files = await ExportService.exportData(false)
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
