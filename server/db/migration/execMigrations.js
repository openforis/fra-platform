const dbmigrate = require('db-migrate')

module.exports = async () => {
  console.log('running migrations')
  const dbm = dbmigrate.getInstance(true, {
    config: `${__dirname}/database.json`,
    cwd: `${__dirname}/`,
    env: process.env.NODE_ENV,
  })

  try {
    await dbm.up()
    console.log('successfully migrated')
  } catch (err) {
    console.log('error running migrations', err)
  }
}
