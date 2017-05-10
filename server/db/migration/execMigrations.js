module.exports = () => {
    console.log('running migrations')
    const dbm = require('db-migrate').getInstance(true,
        {config: `${__dirname}/database.json`,
         cwd: `${__dirname}/`
        })
    dbm.up().then(() => {
        console.log("successfully migrated")
    }).catch((err) => {
        console.log("error running migrations", err)
    })
}
