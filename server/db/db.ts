import * as pgPromise from 'pg-promise'
import { ProcessEnv } from '@server/utils'

const logger = {
  debug: console.debug,
}

const debugOptions = {
  query: (e: pgPromise.IEventContext) => {
    logger.debug(`QUERY: ${e.query}`)
    if (e.params) {
      logger.debug(`PARAMS: ${JSON.stringify(e.params)}`)
    }
  },
}

const initOptions = {
  ...(ProcessEnv.debug ? debugOptions : {}),
}

const pgp = pgPromise(initOptions)

// Timestamp will automatically be converted to UTC time-zone - No need to convert in select queries anymore
// 1114 is OID for timestamp in Postgres
pgp.pg.types.setTypeParser(1114, (str: string) => new Date(`${str} GMT`))

const configCommon: any = {
  // How long a client is allowed to remain idle before being closed
  idleTimeoutMillis: 30000,
  // Max number of clients in the pool
  max: 30,
  ssl: ProcessEnv.pgSsl ? { rejectUnauthorized: true } : false,
}

const config = ProcessEnv.dbUrl
  ? {
      connectionString: ProcessEnv.dbUrl,
      ...configCommon,
    }
  : {
      user: ProcessEnv.pgUser,
      database: ProcessEnv.pgDatabase,
      password: ProcessEnv.pgPassword,
      host: ProcessEnv.pgHost,
      port: ProcessEnv.pgPort,
      ...configCommon,
    }

export type BaseProtocol<T = any> = pgPromise.IBaseProtocol<T>

export const DB = pgp(config)
