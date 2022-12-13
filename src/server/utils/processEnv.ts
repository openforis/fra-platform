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
  debug: process.env.DEBUG === 'true',

  nodeEnv: process.env.NODE_ENV || NodeEnv.development,

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
  pgSsl: process.env.PGSSL === 'true',

  // Mail variables - fallback to FRA_* for local
  mail: {
    host: process.env.MAILGUN_SMTP_SERVER ?? process.env.FRA_MAIL_HOST,
    port: Number(process.env.MAILGUN_SMTP_PORT ?? process.env.FRA_MAIL_PORT),
    secure: process.env.FRA_MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN ?? process.env.FRA_MAIL_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD ?? process.env.FRA_MAIL_PASSWORD,
    },
  },
}
