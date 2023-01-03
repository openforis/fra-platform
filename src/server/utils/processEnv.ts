import * as process from 'process'

const dbUrl = process.env.DATABASE_URL

const regExDbUrl = /postgres:\/\/(\w+):(\w+)@([\w-.\d]+):(\d+)\/(\w+)/

const dbUrlMatch = dbUrl ? dbUrl.match(regExDbUrl) : null

const [pgUser, pgPassword, pgHost, pgPort, pgDatabase] = dbUrlMatch
  ? [dbUrlMatch[1], dbUrlMatch[2], dbUrlMatch[3], dbUrlMatch[4], dbUrlMatch[5]]
  : [process.env.PGUSER, process.env.PGPASSWORD, process.env.PGHOST, process.env.PGPORT, process.env.PGDATABASE]

export enum NodeEnv {
  development = 'development',
  production = 'production',
  test = 'test',
}

export const ProcessEnv = {
  // dev
  debug: process.env.DEBUG === 'true',
  nodeEnv: process.env.NODE_ENV || NodeEnv.development,
  logLevel: process.env.LOG_LEVEL ?? (process.env.DEBUG === 'true' ? 'debug' : 'error'),

  // fra
  fraReportCollaboratorsExcluded: JSON.parse(process.env.FRA_REPORT_COLLABORATORS_EXCLUDED ?? '[]'),
  fraAtlantisAlloawed: JSON.parse(process.env.FRA_ATLANTIS_ALLOWED ?? 'false'),

  invitationExpiryDays: Number(process.env.INVITATION_EXPIRY_DAYS) || 7,

  // DB
  dbUrl,
  pgUser,
  pgPassword,
  pgHost,
  pgPort: Number(pgPort),
  pgDatabase,
  pgMaxConnections: Number(process.env.PG_MAX_CONNECTIONS ?? 20),
  pgSsl: process.env.PGSSL === 'true',

  // Redis
  // process.env.REDISCLOUD_URL -> heroku Redis Enterprise Cloud add-ons
  redisUrl: process.env.REDISCLOUD_URL ?? process.env.REDIS_URL ?? 'redis://127.0.0.1:6379',
}
