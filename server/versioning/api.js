const { getAllVersions, addVersion, deleteVersion } = require('./versioningRepository')
const { isAdministrator } = require("../../common/countryRole")
const { sendErr, getUser, send404 } = require('../utils/requestUtils')

// TODO: add authentication
module.exports.init = app => {
  app.get('/versioning/', async (req, res) => {
    const user = getUser(req)
    if (!isAdministrator(user)) {
      send404(res)
    }
    const versions = await getAllVersions()
    res.json(versions)
  })

  app.post('/versioning/', async (req, res) => {
    const user  = getUser(req)
    const { userId } = user
    
    if (!isAdministrator(user)) {
      send404(res)
    }
    const { version, timestamp } = req.body
    try {
      if (!version || !timestamp) {
        console.log({
          version,
          timestamp
        })
        throw "Param null at POST/versioninig/"
      }
      addVersion(userId, version, timestamp)
      const versions = await getAllVersions();
      res.json(versions)
    } catch (err) {
      console.log(err)
      sendErr(res, err)
    }
  })

  app.delete('/versioning/:id', async (req, res) => {
    const user = getUser(req)
    if (!isAdministrator(user)) {
      send404(res)
    }
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
