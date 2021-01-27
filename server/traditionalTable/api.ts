// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('./traditionalTableRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, sendOk } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

const Assessment = require('../../common/assessment/assessment')

module.exports.init = (app: any) => {
  app.post(
    '/traditionalTable/:countryIso/:tableSpecName',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const {
          user,
          body,
          params: { countryIso, tableSpecName },
        } = req

        await db.transaction(repository.save, [user, countryIso, tableSpecName, body])

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.get('/traditionalTable/:assessmentType/:countryIso/:tableSpecName', async (req: any, res: any) => {
    try {
      const {
        params: { assessmentType, countryIso, tableSpecName },
      } = req
      const schemaName = Assessment.isTypePanEuropean(assessmentType)
        ? 'pan_european'
        : await VersionService.getDatabaseSchema(req)
      const result = await repository.read(countryIso, tableSpecName, schemaName)
      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })
}
