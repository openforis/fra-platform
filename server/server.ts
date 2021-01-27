require('dotenv').config()

const migrations = require('./db/migration/execMigrations')

const serverInit = require('./serverInit')

const cluster = require('cluster')

const VersioningScheduler = require('./system/schedulers/versioningScheduler')

if (cluster.isMaster) {

  // check db migrations in master process
  migrations()

  const numWorkers = process.env.WEB_CONCURRENCY || require('os').cpus().length

  console.log('Master cluster setting up ' + numWorkers + ' workers...')

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
  })

  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
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

