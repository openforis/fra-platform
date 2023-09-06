import * as pgPromise from 'pg-promise'

import { Logger } from '../utils/logger'
import { ProcessEnv } from '../utils/processEnv'

const debugOptions = {
  query: (e: pgPromise.IEventContext) => {
    Logger.debug(`QUERY: ${e.query}`)
    if (e.params) {
      Logger.debug(`PARAMS: ${JSON.stringify(e.params)}`)
    }
  },
}

const initOptions = {
  ...(ProcessEnv.debug ? debugOptions : {}),
}

const pgp = pgPromise(initOptions)

// Timestamp will automatically be converted to UTC time-zone - No need to convert in select queries anymore
// 1114 is OID for TIMESTAMPTZ in Postgres
pgp.pg.types.setTypeParser(1114, (str: string) => new Date(`${str} GMT`))
// INT8 = 20, INT2 = 21, INT4 = 23, FLOAT4 = 700, FLOAT8 = 701, NUMERIC = 1700 -> convert numeric types to number. By default, pg-promise returns string
const numericParser = (value: string): number => Number(value)
pgp.pg.types.setTypeParser(20, numericParser)
pgp.pg.types.setTypeParser(21, numericParser)
pgp.pg.types.setTypeParser(23, numericParser)
pgp.pg.types.setTypeParser(700, numericParser)
pgp.pg.types.setTypeParser(701, numericParser)
pgp.pg.types.setTypeParser(1700, numericParser)

const configCommon = {
  // How long a client is allowed to remain idle before being closed
  idleTimeoutMillis: 30000,
  // Max number of clients in the pool
  max: ProcessEnv.pgMaxConnections,
  ssl: ProcessEnv.pgSsl ? { rejectUnauthorized: false } : false,
  // ssl: { rejectUnauthorized: false },
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
