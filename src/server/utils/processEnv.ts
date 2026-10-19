import process from 'process'

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
  // app
  appUri: process.env.APP_URI ?? 'http://localhost:9001',
  port: process.env.PORT ? Number(process.env.PORT) : 80,

  // aws/s3
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsRegion: process.env.AWS_REGION,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3BucketName: process.env.S3_BUCKET_NAME,

  // dev
  debug: process.env.DEBUG === 'true',
  nodeEnv: process.env.NODE_ENV || NodeEnv.development,
  logLevel: process.env.LOG_LEVEL ?? (process.env.DEBUG === 'true' ? 'debug' : 'error'),

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
  fraMailEnabled: process.env.FRA_MAIL_ENABLED === 'true',

  // Redis
  redisDataUrl: process.env.REDISCLOUD_DATA_URL ?? process.env.REDIS_DATA_URL ?? 'redis://127.0.0.1:6389',
  redisQueueUrl: process.env.REDISCLOUD_URL ?? process.env.REDIS_QUEUE_URL ?? 'redis://127.0.0.1:6379',
  redisTlsRejectUnauthorized: process.env.REDIS_TLS_REJECT_UNAUTHORIZED !== 'false',

  // Kiosk
  kioskActivitiesSheetUrl: process.env.KIOSK_ACTIVITIES_SHEET_URL,

  // Heroku
  herokuApiKey: process.env.HEROKU_API_KEY,
  herokuAppName: process.env.HEROKU_APP_NAME,

  // scripts
  fraAuthToken: process.env.FRA_AUTH_TOKEN,
  fraReportAssessment: process.env.FRA_REPORT_ASSESSMENT,
  fraReportCycle: process.env.FRA_REPORT_CYCLE,
  fraReportSkipAtlantis: process.env.FRA_REPORT_SKIP_ATLANTIS ? Boolean(process.env.FRA_REPORT_SKIP_ATLANTIS) : true,
}
