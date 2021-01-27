// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getAllVers... Remove this comment to see the full error message
const { getAllVersions, addVersion, deleteVersion, getLatestSchemaVersion } = require('./versioningRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, getUserId } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

module.exports.init = (app: any) => {
  app.get('/versioning/', Auth.requireAdminPermission, async (req: any, res: any) => {
    const versions = await getAllVersions()
    res.json(versions)
  })

  app.post('/versioning/', Auth.requireAdminPermission, async (req: any, res: any) => {
    const userId = getUserId(req)
    const { versionNumber, publishedAt } = req.body
    try {
      if (!versionNumber || !publishedAt || !userId) {
        sendErr(res)
      }
      addVersion(userId, versionNumber, publishedAt)
      const versions = await getAllVersions()
      res.json(versions)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/versioning/:id', Auth.requireAdminPermission, async (req: any, res: any) => {
    const { id } = req.params
    if (!id) {
      return
    }

    try {
      await deleteVersion(id)
    } catch (error) {
      sendErr(res, error)
    }

    const versions = await getAllVersions()
    res.json(versions)
  })

  app.get('/versioning/latest', Auth.requireAdminPermission, async (req: any, res: any) => {
    const version = await getLatestSchemaVersion()
    res.json(version)
  })
}
