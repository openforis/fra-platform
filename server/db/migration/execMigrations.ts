module.exports = () => {
  console.log('running migrations')
  const dbm = require('db-migrate').getInstance(true, {
    config: `${__dirname}/database.json`,
    cwd: `${__dirname}/`,
    env: process.env.NODE_ENV,
  })

  dbm
    .up()
    .then(() => {
      console.log('successfully migrated')
    })
    .catch((err: any) => {
      console.log('error running migrations', err)
    })
}
