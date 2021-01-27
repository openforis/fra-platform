require('dotenv').config()

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'migrations... Remove this comment to see the full error message
const migrations = require('./db/migration/execMigrations')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serverInit... Remove this comment to see the full error message
const serverInit = require('./serverInit')

migrations()
serverInit()
