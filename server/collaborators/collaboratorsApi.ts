// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'persistCol... Remove this comment to see the full error message
const { persistCollaboratorCountryAccess } = require('./collaboratorsRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

module.exports.init = (app: any) => {
  // save collaborator country access access
  app.post('/collaboratorCountryAccess/:countryIso', async (req: any, res: any) => {
    try {
      checkCountryAccessFromReqParams(req)

      const { countryIso } = req.params
      const collaboratorTableAccess = req.body

      await db.transaction(persistCollaboratorCountryAccess, [req.user, countryIso, collaboratorTableAccess])

      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })
}
