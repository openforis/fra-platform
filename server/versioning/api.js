const db = require('../db/db')

module.exports.init = app => {

  app.get('/versioning/', async (req, res) => {
    res.json(
      [
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
    )
  })

}
