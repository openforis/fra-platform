const db = require('../db/db')
const { sendErr, sendOk } = require('../utils/requestUtils')
const versions = [
  {
    version: '1.0.0',
    timestamp: '1576677210872',
    createdBy: 'Admin User',
    status: 'pending'
  },
  {
    version: '2.0.0',
    timestamp: '1576677210872',
    createdBy: 'Admin User2',
    status: 'pending'
  }
]

module.exports.init = app => {

  app.post('/versioning/', async (req, res) => {
    try {
      const version = '';
      // Create new schema
      console.log(req.body)
      res.json(versions)
    } catch (err) {
      console.log(err)
      sendErr(res, err)
    }
  })

  app.get('/versioning/', async (req, res) => {
    res.json(versions)
  })

}
