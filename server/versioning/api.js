const { getAllVersions, addVersion, deleteVersion } = require('./versioningRepository')
const { isAdministrator } = require("../../common/countryRole")
const { sendErr, getUser, getUserId, send404 } = require('../utils/requestUtils')

const checkAdmin = (req, res) => {
  const user = getUser(req)
    if (!isAdministrator(user)) {
      send404(res)
    }
}

module.exports.init = app => {
  app.get('/versioning/', async (req, res) => {
    checkAdmin(req, res)
    const versions = await getAllVersions()
    res.json(versions)
  })

  app.post('/versioning/', async (req, res) => {
    checkAdmin(req, res)
    const userId = getUserId(req)
    const { version, timestamp } = req.body
    try {
      if (!version || !timestamp || !userId) {
        sendErr(res)
      }
      addVersion(userId, version, timestamp)
      const versions = await getAllVersions();
      res.json(versions)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/versioning/:id', async (req, res) => {
    checkAdmin(req, res)
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
