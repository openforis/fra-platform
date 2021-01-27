require('dotenv').config()

const cluster = require('cluster')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'migrations... Remove this comment to see the full error message
const migrations = require('./db/migration/execMigrations')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serverInit... Remove this comment to see the full error message
const serverInit = require('./serverInit')

const VersioningScheduler = require('./system/schedulers/versioningScheduler')

if (cluster.isMaster) {
  // check db migrations in master process
  migrations()

  const numWorkers = process.env.WEB_CONCURRENCY || require('os').cpus().length

  console.log(`Master cluster setting up ${numWorkers} workers...`)

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', function (worker: any) {
    console.log(`Worker ${worker.process.pid} is online`)
  })

  cluster.on('exit', function (worker: any, code: any, signal: any) {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`)
    console.log('Starting a new worker')
    cluster.fork()
  })

  // ====== schedulers
  const createSchedulers = async () => {
    await VersioningScheduler.init()
  }
  createSchedulers()
} else {
  serverInit()
}
