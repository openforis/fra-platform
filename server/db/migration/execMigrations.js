const dbmigrate = require('db-migrate')

module.exports = async () => {
  console.log('Running db migrations')
  try {
    const dbm = dbmigrate.getInstance(true, {
      config: `${__dirname}/database.json`,
      cwd: `${__dirname}/`,
      env: process.env.NODE_ENV,
      throwUncatched: true,
    })

    await dbm.up()
    console.log('DB successfully migrated')
  } catch (err) {
    console.log('error running migrations', err)
    throw err
  }
}
