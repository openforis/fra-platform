// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getStatist... Remove this comment to see the full error message
const { getStatisticalFactsheetData } = require('./service')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

module.exports.init = (app: any) => {
  app.get('/statisticalFactsheets/', async (req: any, res: any) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const {
      query: { rowNames, level },
    } = req
    const statisticalFactsheetData = await getStatisticalFactsheetData(schemaName, level, rowNames)
    res.json(statisticalFactsheetData)
  })
}
