const { getAllVersions, addVersion, deleteVersion } = require('./versioningRepository')
const { sendErr, getUserId, send404 } = require('../utils/requestUtils')

const Auth = require('../auth/authApiMiddleware')

module.exports.init = app => {
  app.get('/versioning/', Auth.requireAdminPermission, async (req, res) => {
    const versions = await getAllVersions()
    res.json(versions)
  })

  app.post('/versioning/', Auth.requireAdminPermission, async (req, res) => {
    checkAdmin(req, res)
    const userId = getUserId(req)
    const { versionNumber, publishedAt } = req.body
    try {
      if (!versionNumber || !publishedAt || !userId) {
        sendErr(res)
      }
      addVersion(userId, versionNumber, publishedAt)
      const versions = await getAllVersions();
      res.json(versions)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/versioning/:id', Auth.requireAdminPermission, async (req, res) => {
    const { id } = req.params
    if (!id) {
      return
    }

    try {
      await deleteVersion(id)
    } catch (error) {
      sendErr(res, error)
    }

    const versions = await getAllVersions();
    res.json(versions)
  })

}
