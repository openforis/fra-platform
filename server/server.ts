import 'tsconfig-paths/register'
import 'dotenv/config'

import * as cluster from 'cluster'
import * as migrations from './db/migration/execMigrations'
import { serverInit } from './serverInit'

import * as VersioningScheduler from './system/schedulers/versioningScheduler'
import * as os from 'os'

if (cluster.isMaster) {
  // check db migrations in master process
  migrations()

  const numWorkers = process.env.WEB_CONCURRENCY || os.cpus().length

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
